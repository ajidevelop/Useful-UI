$(document).ready(function() {
    var imageCount = $(".slides div").length - 1;
    var slides = $(".slides");
    var nav = $(".navigation");
    var interval = parseInt($(".slidershow").attr('data-interval'));
    var labelClass = $(".slidershow").attr('data-class')
    var margin = 100/imageCount;
    var style = `<style type='text/css'> 
                    .slides { 
                        width: ${imageCount * 100}%;
                    }
                    .slide {
                        width: ${margin}%;
                    }`;

    for (i = imageCount; i >= 1; i--) {
        var navID = "r" + i;
        var inputNavigation = jQuery('<input>', {
            type: 'radio',
            name: 'r',
            id: navID
        });
        var labelNavigation = jQuery('<label></label>', {
            class: labelClass,
            for: navID,
        });

        labelNavigation.click(function(e) {
            if(e.hasOwnProperty('originalEvent'))
                stop()
        });
        style += `#${navID}:checked ~ .s1 { margin-left: ${-margin * (i - 1)}%; }`
        slides.prepend(inputNavigation);
        nav.prepend(labelNavigation);
        

    }
    style += '</style>';
    $(style).appendTo('head');
    $('#r1').attr('checked', 'checked');
    stop = autoplay(0, interval);
});

function autoplay(i, interval) {
    var list = $("label");
    if (!list[i])
        i = 0;

    $(list[i]).trigger("click");
    timer = setTimeout(function() {
        autoplay(i + 1, interval);
    }, interval * 1000);

    function stop() {
        clearTimeout(timer);
        timer = 0;
    }
    return stop;
};

function stopAutoplayer(method) {
    method()
}