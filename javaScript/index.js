$(document).ready(function() {

    // var slideBar = document.getElementById("slideBar");
    // slideBar.onmousedown = function(eventDown) {
    //     var downClick = eventDown.screenX;
    //     var _eventDown = window.event || eventDown;
    //     var left = _eventDown.offsetX; //获取鼠标点击位置和p左边缘距离
    //     //使用移动端调试情况move是不生效的

    // @TODO
    // → → 特么移动端有鼠标吗就 mousemove ……
    // 请用 touchmove
    // 试了一下还是哪里好像有点问题，改日继续

    //     document.onmousemove = function(eventUp) {
    //         var upMouse = eventUp.screenX;
    //         var _eventUp = window.event || eventUp;
    //         var x = _eventUp.clientX - left; //box距离页面左边缘距离
    //         slideBar.style.left = x + "px";
    //         // if(downClick>upMouse){
    //         //   console.log("左滑");
    //         // }
    //         // else{
    //         //   console.log("右滑");
    //         // }
    //         slideBar.onmouseup = function() {
    //             document.onmousemove = null; //当鼠标弹起的时候窗口不跟随鼠标移动
    //         }
    //     }


    // }
    var timeoutID;
    var stop;
    var ImgPathArray = ['./img/slide1.jpeg', './img/slide2.jpeg', './img/slide3.jpeg', './img/slide4.jpeg', './img/slide5.jpeg'];

    var num = 0;
    var beforeShowNum = 0;
    var len = ImgPathArray.length;

    //开始轮播
    var startPicAntimate = function() {
        setDisplayOrder(num, beforeShowNum);
        num = ++num == len ? 0 : num;

        timeoutID = setTimeout(startPicAntimate, 3000); //切换时间
    }

    startPicAntimate();

    //li点击暂停5秒，继续轮播
    $("#slideUl li").click(function() {
        window.clearTimeout(timeoutID);
        var ind = $("#slideUl li").index(this);
        setDisplayOrder(ind, beforeShowNum);

        if (stop) window.clearTimeout(stop);
        stop = setTimeout(function() {
            num = ind;
            startPicAntimate();
        }, 2000);
    });

    //设置图片的显示和li的样式
    function setDisplayOrder(now, before) {
        /* question*/
        //修改src是否比修改display状态更加耗时浪费性能

        // @TODO
        // 是这个意思，但是我想要的轮播，其实是更常见的那种切换动画的
        // 比如你可以参考淘宝这个轮播：https://www.taobao.com/
        // 就是往左移动的动效

        // @REVIEW
        //question 有一个问题从最后一张再回到第一张感觉怪怪的，但淘宝的感觉就还好
        $("#slideImg").css('transform', 'translate3d('+ (-now*360) +'px, 0px, 0px)');
        $("#slideUl li").eq(now).css('opacity', 1);
        if (before != now) {
            $("#slideUl li").eq(before).css('opacity', 0.5);
        }
        beforeShowNum = now;
    }
});