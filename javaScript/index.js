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
        // function startPicAntimate() {

        // @TODO
        // 这里就不扣分啦，但是好的做法是用 setTimeout 替换 setInterval
        // setInterval 有一些小坑，涉及事件循环队列的原理，一时说不清
        // 下次见面细讲吧

        // @TODO
        // 但是这里要扣一分，你可以观察下，第一张图停了 6 秒才切
        // num 的初始值应该是？

        setDisplayOrder(num, beforeShowNum);
        num = ++num == len ? 0 : num;

        // @REVIEW
        timeoutID = setTimeout(startPicAntimate, 3000); //切换时间
    }

    startPicAntimate();

    //li点击暂停5秒，继续轮播
    $("#slideUl li").click(function() {
        window.clearTimeout(timeoutID);
        var ind = $("#slideUl li").index(this);
        setDisplayOrder(ind, beforeShowNum);

        // @TODO
        // 扣一分，这里没做防抖处理
        // 你可以试着连续点击一个小点好多下，然后会很酸爽

        // @REVIEW
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
        // 扣四分，最严重的问题，你说的对，会非常浪费性能
        // 分几种情况
        // 首先，如果用户禁用了浏览器/WebView的磁盘缓存功能，
        // 或者客户端/服务端的缓存策略不是按照默认的修改时间来的
        // 那么修改 src 表示每次切换，都会重新抓图
        // 其次，即使磁盘缓存OK，那么每次切换，也会从本地磁盘重新抓图
        // 那退一万步说，比如这图是 Base64 的，那么你可以在内存级做缓存
        // 但即使如此，每次切换时，显卡都会重新生成 texture，并且绑定新的显存的缓冲区
        // 需要改成常规做法，也用列表

        // @REVIEW
        // 我不知道你说的改成列表是不是这个意思
        $("#slideImg li").eq(now).css('display','inline-block')
        $("#slideUl li").eq(now).css('opacity', 1);
        if (before != now) {
            $("#slideImg li").eq(before).css('display','none')
            $("#slideUl li").eq(before).css('opacity', 0.5);
        }
        beforeShowNum = now;
    }
});