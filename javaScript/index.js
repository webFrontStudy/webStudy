$(document).ready(function() {

    var timeoutID;
    var stop;
    var ImgPathArray = ['./img/slide1.jpeg', './img/slide2.jpeg', './img/slide3.jpeg', './img/slide4.jpeg', './img/slide5.jpeg'];

    var num = 0;
    var beforeShowNum = 0;
    var len = ImgPathArray.length;
    var clientWidth = document.body.clientWidth;
    var clientHeight = document.body.clientHeight;

    // @REVIEW
    var pcFlag = isPC();
    if (pcFlag) {
        clientWidth = "360px";
        clientHeight = "640px";
    }
    $("#slideBar").width(clientWidth);
    $("#slideBar").height(clientHeight);
    $("#slideImg li img").width(clientWidth);
    $("#slideImg li img").height(clientHeight);
    $("#slideUl").offset({ 'left': (clientWidth - 100) / 2 });

    function isPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone", "iPod"
        ];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

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
        $("#slideImg").css('transform', 'translate3d(' + (-now * clientWidth) + 'px, 0px, 0px)');
        $("#slideUl li").eq(now).css('opacity', 1);
        if (before != now) {
            $("#slideUl li").eq(before).css('opacity', 0.5);
        }
        beforeShowNum = now;
    }

    // @REVIEW
    var startX;
    var moveEndX;
    var scrollDirection;
    $("#slideBar").on("touchstart", function(e) {

        e.preventDefault();
        // question:为什么我就用e.pageX是没有办法触发到左滑事件的,但是web端的就可以
        startX = e.originalEvent.changedTouches[0].pageX;
        // startX = e.pageX;
    });
    $("#slideBar").on("touchmove", function(e) {

        e.preventDefault();
        moveEndX = e.originalEvent.changedTouches[0].pageX;
        // moveEndX = e.pageX;
        scrollDirection = moveEndX - startX;
    });
    $("#slideBar").on("touchend", function(e) {
        // if(now)
        e.preventDefault();
        window.clearTimeout(timeoutID);
        if (scrollDirection > 0) {
            console.log("左滑");
            num = beforeShowNum == 0 ? 4 : beforeShowNum - 1;
            startPicAntimate();
        } else {
            console.log("右滑");
            startPicAntimate();
        }
    });

    $("#slideBar").on("mousedown", function(e) {

        e.preventDefault();
        startX = e.pageX;
    });
    $("#slideBar").on("mousemove", function(e) {

        e.preventDefault();
        moveEndX = e.pageX;
        scrollDirection = moveEndX - startX;
    });
    $("#slideBar").on("mouseup", function(e) {
        // if(now)
        e.preventDefault();
        window.clearTimeout(timeoutID);
        if (scrollDirection > 0) {
            console.log("左滑");
            num = beforeShowNum == 0 ? 4 : beforeShowNum - 1;
            startPicAntimate();
        } else {
            console.log("右滑");
            startPicAntimate();
        }
    });
});