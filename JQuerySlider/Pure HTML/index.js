let checkedLabel = null;

$(function() {
    $.mobile.loader.prototype.options.textVisible = false;
    let sliderShow = $(".slidershow");
    let imageCount = $(sliderShow).find(".slides div").length - 1;
    let slides = $(sliderShow).find(".slides");
    let nav = $(sliderShow).find(".navigation");

    let interval = parseInt(sliderShow.attr('data-interval'));
    let labelClass = sliderShow.attr('data-class');
    let speed = sliderShow.attr('data-speed');

    labelClass = typeof undefined || labelClass === '' ? 'bar' : labelClass;
    let margin = 100/imageCount;

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
    stop = autoplay(0, interval);

    sliderShow.find('img').on('swipeleft', function() {
        moveSlide(false);
    });

    sliderShow.find('img').on('swiperight', function() {
        moveSlide();
    })

    function moveSlide(moveRight=true) {
        let list = $(sliderShow).find('label');
        let currLabel = null;
        for (let i = 0; i < list.length; i++) {
            currLabel = list[i];
            if ($(currLabel).attr('checked') === 'checked') {
                currLabel = moveRight ? (i - 1 !== 0 ? list[i - 1] : list[list.length - 1]) : (i + 1 !== list.length ? list[i+1] : list[0]);
                console.log(currLabel);
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
        console.log(clearTimeout(timer));
        timer = 0;
    }
    return stop;
}