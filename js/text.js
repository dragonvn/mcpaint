'use strict';

// TODO: テキスト
// http://www.html5.jp/canvas/ref/method/fillText.html
window.addEventListener("load", function() {
    var start_x;
    var start_y;
    var offset = 5;
    var flag = false;
    var getImage;
    var undoImage;
    var brush_size = 1;
    var alphaSize = 1;
    var brush_color = '#000000';

    // キャンバス
    var canvas = document.getElementById("canvas");
    if (canvas.getContext) {
        var context = canvas.getContext('2d');
    }

    $('canvas').mousedown(function(e) {
        undoImage = context.getImageData(0, 0, $('canvas').width(), $('canvas').height());
        flag = true;
        start_x = e.pageX - $(this).offset().left - offset;
        start_y = e.pageY - $(this).offset().top - offset;
        return false; // for chrome
    });

    $('canvas').mousemove(function(e) {
        if (!flag) {
            return;
        }

        var endX = e.pageX - $('canvas').offset().left - offset;
        var endY = e.pageY - $('canvas').offset().top - offset;

        var is_text = $('#text').is(':checked');

        if (is_text == true) {
            // 軌跡がいるかも？
            // context.globalAlpha = alphaSize;
            // context.beginPath();
            // context.globalCompositeOperation = 'source-over';
            // context.strokeStyle = brush_color;
            // context.lineWidth = brush_size;
            // context.lineJoin = 'miter';
            // context.lineCap = 'butt';
            // context.shadowBlur = 0;
            // context.setTransform(1, 0, 0, 1, 0, 0);
            // context.moveTo(start_x, start_y);
            // context.lineTo(endX, endY);
            // context.stroke();
            // context.closePath();
        }
    });

    window.addEventListener("mouseup", function(e) { // キャンバスでなくウィンドウに
        var is_text = $('#text').is(':checked');

        var endX = e.pageX - $('canvas').offset().left - offset;
        var endY = e.pageY - $('canvas').offset().top - offset;

        if (is_text == true) {
            context.globalAlpha = alphaSize;
            context.beginPath();
            context.globalCompositeOperation = 'source-over';
            context.strokeStyle = brush_color;
            context.lineWidth = brush_size;
            context.lineJoin = 'miter';
            context.lineCap = 'butt';
            context.shadowBlur = 0;
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.moveTo(start_x, start_y);
            context.lineTo(endX, endY);
            context.stroke();
            context.closePath();
        }

        getImage = context.getImageData(0, 0, $('canvas').width(), $('canvas').height());
        flag = false;
    });
})