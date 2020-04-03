$(function() {
    let imageCount = $(".slides div").length - 1;
    let slides = $(".slides");
    let nav = $(".navigation");
    let interval = parseInt($(".slidershow").attr('data-interval'));
    let labelClass = $(".slidershow").attr('data-class');
    labelClass = typeof undefined || labelClass === '' ? 'bar' : labelClass;
    let margin = 100/imageCount;
    let style = `<style type='text/css'> 
                    .slides { 
                        width: ${imageCount * 100}%;
                    }
                    .slide {
                        width: ${margin}%;
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
            if(e.hasOwnProperty('originalEvent'))
                stop()
        }));
        style += `#${navID}:checked ~ .s1 { margin-left: ${-margin * (i - 1)}%; }`;
        slides.prepend(inputNavigation);
        nav.prepend(labelNavigation);
        

    }
    style += '</style>';
    $(style).appendTo('head');
    $('#r1').attr('checked', 'checked');
    stop = autoplay(0, interval);
});

function autoplay(i, interval) {
    let list = $("label");
    if (!list[i])
        i = 0;

    $(list[i]).trigger("click");
    let timer = setTimeout(function() {
        autoplay(i + 1, interval);
    }, interval * 1000);

    function stop() {
        clearTimeout(timer);
        timer = 0;
    }
    return stop;
}