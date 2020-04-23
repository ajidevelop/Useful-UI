let checkedLabel = null;

$(function() {
    let sliderShow = $(".slidershow");
    let imageCount = $(sliderShow).find(".slides div").length - 1;
    let slides = $(sliderShow).find(".slides");
    let nav = $(sliderShow).find(".navigation");
    let imgList = $(sliderShow).find('img');


    let interval = parseInt(sliderShow.attr('data-interval'));
    let labelClass = sliderShow.attr('data-class');
    let speed = sliderShow.attr('data-speed');
    let hideNavArrows = parseInt(sliderShow.attr('data-hideNavArrows'));
    let hideNavigation = parseInt(sliderShow.attr('data-hideNavigation'));

    if (hideNavigation) {
        nav.css('display', 'none');
    } else if (hideNavArrows) {
        nav.find('#arrow-left, #arrow-right').css('display', 'none');
    }

    labelClass = typeof undefined || labelClass === '' ? 'bar' : labelClass;
    let margin = 100 / imageCount;

    let style = `<style type='text/css'> 
                    .slides { 
                        width: ${imageCount * 100}%;
                    }
                    .slide {
                        width: ${margin}%;
                        transition: ${speed}s;
                    }`;

    for (let i = imageCount; i >= 1; i--) {
        if (i === 1)
            $(imgList[i - 1]).css('display', 'block');
        else
            $(imgList[i - 1]).css('display', 'none');

        let navID = "r" + i;
        let inputNavigation = jQuery('<input>', {
            type: 'radio',
            name: 'r',
            id: navID
        });
        // noinspection CheckTagEmptyBody
        let labelNavigation = jQuery('<label></label>', {
            class: labelClass,
            for: navID, 
        });

        labelNavigation.on('click', (function(e) {
            if (e.hasOwnProperty('originalEvent')) {
                clearInterval(timer);
            }
            e = e.currentTarget;
            let labelList = $(sliderShow).find('label');
            let newLabelIdx = $(e).attr('for')[1] - 1;
            checkedLabel = labelList[newLabelIdx];
            let imgTarget = imgList[newLabelIdx];

            $(labelList).each(function (idx) {
                $(labelList[idx]).removeAttr('checked');
                $(imgList[idx]).css('display', 'none');
            });
            $(imgTarget).css('display', `block`);
            $(checkedLabel).attr('checked', 'checked');
        }));
        style += `#${navID}:checked ~ .s1 { margin-left: ${-margin * (i - 1)}%; }`;
        slides.prepend(inputNavigation);
        nav.prepend(labelNavigation);
    }
    style += '</style>';
    $(style).appendTo('head');
    sliderShow.find('label[for=r1]').attr('checked', 'checked');
    checkedLabel = $(sliderShow).find('label')[0];
    $(nav).find('#arrow-left').prependTo(nav);

    let timer = setInterval(function () {
        moveSlide();
    }, interval * 1000);

    nav.find('#arrow-right').on('click', function () {
        moveSlide(true, timer);
    })
    sliderShow.find('img').on('swipeleft', function () {
        moveSlide(true, timer);
    });

    nav.find('#arrow-left').on('click', function () {
        moveSlide(false, timer);
    })
    sliderShow.find('img').on('swiperight', function () {
        moveSlide(false, timer);
    })
});

function moveSlide(moveRight = true, timer = null) {
    let sliderShow = $(".slidershow");
    let labelList = $(sliderShow).find('label');
    let currLabel = null;
    for (let i = 0; i < labelList.length; i++) {
        currLabel = labelList[i];
        if ($(currLabel).attr('checked') === 'checked') {
            if (moveRight === true) {
                currLabel = i + 1 !== labelList.length ? labelList[i + 1] : labelList[0];
            } else {
                currLabel = i - 1 !== -1 ? labelList[i - 1] : labelList[labelList.length - 1];
            }
            break;
        }
    }
    $(currLabel).trigger('click');
    if (timer !== null) {
        clearInterval(timer);
    }
}