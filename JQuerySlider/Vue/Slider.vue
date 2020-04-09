<template>
    <div class="slidershow middle" data-class="bar" data-interval="3">
        <div class="slides">

            <div class="slide s1"><img src="../images/1.jpg" alt=""></div>
            <div class="slide"><img src="../images/2.jpg" alt=""></div>
            <div class="slide"><img src="../images/3.jpg" alt=""></div>
            <div class="slide"><img src="../images/4.jpg" alt=""></div>
            <div class="slide"><img src="../images/5.jpg" alt=""></div>

            <div class="navigation">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Slider",
        mounted() {
            let jqueryScript = document.createElement('script');
            jqueryScript.setAttribute('src', 'https://code.jquery.com/jquery-3.4.1.min.js');
            jqueryScript.setAttribute('integrity', 'sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=');
            jqueryScript.setAttribute('crossorigin', 'anonymous');
            // jqueryScript.head.appendChild(jqueryScript)
        }
    }
    // import JQuery from 'jquery'
    // let $ = JQuery;
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
</script>

<style scoped>
    body {
        margin-block-start: 10px;
        background: #34495e;
        padding: 0;
    }

    /* Slideshow */

    .slidershow {
        width: 80%;
        overflow: hidden;
    }

    .middle {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .navigation {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
    }

    /* Navigation */
    .bar {
        width: 50px;
        height: 10px;
        border: 2px solid #fff;
        margin: 5px;
        cursor: pointer;

        /*&:hover {*/
        /*    background: #fff;*/
        /*}*/

    }

    input[name="r"] {
        position: absolute;
        visibility: hidden;
    }

    /* Slides */
    .slides {
        height: 100%;
        display: flex;
    }

    .slide {
        transition: 0.6s;

    img {
        width: 100%;
    }
    }
</style>
