$(document).ready(function() {
    var mySwiper_1 = new Swiper('#swiper-1', {
        autoplay: true,//可选选项，自动滑动
        effect: 'fade', //切换效果
        loop: true,
        pagination: {  //分页器,
            el: '.swiper-dots',  // 绑定元素-默认小圆点
        },
        navigation: {
            nextEl: '.swiper-next-1',
            prevEl: '.swiper-prev-1',
        },
    });
    mySwiper_1.el.onmouseover = function(){  //鼠标经过,停止自动切换
        mySwiper_1.autoplay.stop();
    }

    var mySwiper_2 = new Swiper('#swiper-2', {
        autoplay: true,//可选选项，自动滑动
        effect: 'fade', //切换效果
        loop: true,
        navigation: {
            nextEl: '.swiper-next-2',
            prevEl: '.swiper-prev-2',
        },
    });
    mySwiper_2.el.onmouseover = function(){  //鼠标经过,停止自动切换
        mySwiper_2.autoplay.stop();
    }
})
