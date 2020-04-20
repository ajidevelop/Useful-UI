let checkedLabel = null;

$(function() {
    let sliderShow = $(".slidershow");
    let imageCount = $(sliderShow).find(".slides div").length - 1;
    let slides = $(sliderShow).find(".slides");
    let nav = $(sliderShow).find(".navigation");

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
                        transition: ${speed};
                    }`;

    for (let i = imageCount; i >= 1; i--) {
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
            if(e.hasOwnProperty('originalEvent')) {
                stop();
            }
            e = e.currentTarget;
            let labelList = $(sliderShow).find('label');
            checkedLabel = labelList[$(e).attr('for')[1] - 1];

            $(labelList).each(function(idx) {
                $(labelList[idx]).removeAttr('checked');
            });
            $(checkedLabel).attr('checked', 'checked');
        }));
        style += `#${navID}:checked ~ .s1 { margin-left: ${-margin * (i - 1)}%; }`;
        slides.prepend(inputNavigation);
        nav.prepend(labelNavigation);
    }
    style += '</style>';
    $(style).appendTo('head');
    $('#r1').attr('checked', 'checked');
    checkedLabel = $(sliderShow).find('label')[0];
    $(nav).find('#arrow-left').prependTo(nav);

    stop = autoplay(0, interval);

    nav.find('#arrow-right').on('click', function () {
        moveSlide();
    })
    sliderShow.find('img').on('swipeleft', function () {
        moveSlide();
    });

    nav.find('#arrow-left').on('click', function () {
        moveSlide(false);
    })
    sliderShow.find('img').on('swiperight', function () {
        moveSlide(false);
    })

    function moveSlide(moveRight = true) {
        let list = $(sliderShow).find('label');
        let currLabel = null;
        for (let i = 0; i < list.length; i++) {
            currLabel = list[i];
            if ($(currLabel).attr('checked') === 'checked') {
                if (moveRight === true) {
                    currLabel = i + 1 !== list.length ? list[i + 1] : list[0];
                } else {
                    currLabel = i - 1 !== -1 ? list[i - 1] : list[list.length - 1];
                }
                break;
            }
        }
        $(currLabel).trigger('click');
    }
});

function autoplay(i, interval) {
    let list = $(".slidershow label");
    if (!list[i])
        i = 0;

    $(list[i]).trigger("click");

    let timer = setTimeout(function() {
        autoplay(i + 1, interval);
    }, interval * 1000);

    function stop() {
        timer = 0;
    }
    return stop;
}