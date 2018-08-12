/**
 * Created by huk on 2018/8/11.
 */

var radius = 5;
var width = null;
var height = null;
var time = 0;
var a = null;
var b = null;
var timer = null;

$(function () {
    var earthContent = document.querySelector('#earthContent');
    width = earthContent.clientWidth;
    height = earthContent.clientHeight;
    a = earthContent.clientWidth / 2.5;
    b = earthContent.clientWidth / 6.3;

    var canvas = document.querySelector('#earth');
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext('2d');
    arcRoute(ctx, width / 2, height / 2, a, b, radius);
    timer = setInterval(function () {
        arcRoute(ctx, width / 2, height / 2, a, b, radius);
    }, 30);
});

function arcRoute(context, x, y, a, b, r) {
    context.clearRect(0, 0, width, height);
    route(context, x, y, a, b);
    gradientRoute(context, x, y, a * 0.7, b * 0.7);
    context.fillStyle = "#04ddff";
    if (time === 0) {
        context.beginPath();
        context.arc(x, y, r, 0, 2 * Math.PI, true);
        context.arc(x, y, r, 0, 2 * Math.PI, true);
        context.closePath();
        context.fill();
    } else {
        context.beginPath();
        context.arc(x + a * Math.cos(time), y + b * Math.sin(time), r, 0, 2 * Math.PI, true);
        context.arc(x + a * Math.cos(time - 1.6), y + b * Math.sin(time - 1.6), r, 0, 2 * Math.PI, true);
        context.closePath();
        context.fill();

        moveRoute(context, x, y, a, b, time);
        moveRoute(context, x, y, a, b, time - 1.6);
    }
    time = time - 0.02;
}

//椭圆路线绘制
function route(context, x, y, a, b) {
    var step = (a > b) ? 1 / a : 1 / b;
    context.beginPath();
    context.strokeStyle = "rgba(48,100,224,.4)";
    context.lineWidth = 2;
    context.moveTo(x + a, y); //从椭圆的左端点开始绘制
    for ( var i = 0; i < 2 * Math.PI; i += step ) {
        context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
    }
    context.closePath();
    context.stroke();
}

function gradientRoute(context, x, y, a, b) {
    var step = (a > b) ? 1 / a : 1 / b;
    context.beginPath();
    var g = context.createLinearGradient(x + a, y, x + a * Math.cos(Math.PI), y + b * Math.sin(Math.PI));
    g.addColorStop(1, 'rgba(4,221,255,.9)');
    g.addColorStop(0, 'rgba(4,221,255,.2)');
    context.strokeStyle = g;
    context.lineWidth = 2;
    context.moveTo(x + a, y); //从椭圆的左端点开始绘制
    for ( var i = 0; i < Math.PI; i += step ) {
        context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
    }
    // context.closePath();
    context.stroke();
    context.beginPath();
    context.moveTo(x + a, y);
    for ( var i = 0; i < Math.PI; i += step ) {
        context.lineTo(x + a * Math.cos(i), y - b * Math.sin(i));
    }
    context.stroke();
}

function moveRoute(context, x, y, a, b, time) {
    var step = (a > b) ? 1 / a : 1 / b;
    context.beginPath();
    var g = context.createLinearGradient(x + a * Math.cos(time), y + b * Math.sin(time), x + a * Math.cos(time + 0.2 * Math.PI), y + b * Math.sin(time + 0.2 * Math.PI));
    g.addColorStop(0, 'rgba(4,221,255,.9)');
    g.addColorStop(1, 'rgba(4,221,255,.1)');
    context.strokeStyle = g;     //使用渐变对象
    context.lineWidth = 2;
    context.moveTo(x + a * Math.cos(time), y + b * Math.sin(time)); //从椭圆的左端点开始绘制
    for ( var i = 0; i < 0.2 * Math.PI; i += step ) {
        context.lineTo(x + a * Math.cos(time + i), y + b * Math.sin(time + i));
    }
    context.stroke();
}