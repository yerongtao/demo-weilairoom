(function() {
  "use strict";

  // load dependencies
  var animationControl = require("./animation-control.js");
  var qwClickFun = require("./qw-click-fun.js");

  $(document).ready(function() {
    init();

    // 区位交通page页面的点击操作
    qwClickFun.qwBtnClick();
    qwClickFun.qwBtnDX();

    // 下方导航 menu-main 的切换
    $(".menu-main").on("click", "li", function() {
      $(this)
        .addClass("action")
        .siblings()
        .removeClass("action");
      var index = $(this).index();
      // alert(index);
      $(".page")
        .eq(index)
        .addClass("action")
        .siblings()
        .removeClass("action")
      $(".page-hx-xiangqing").css("display", "none");
      if(index == 4) {
        $(".tools-list").toggleClass("action");
      }
    });

    // 户型鉴赏查看详情按钮打开户型鉴赏详情页
    $(".hx-btn").click(function() {
      $(".page-hx-xiangqing").css("display", "block");
    });
    $(".hx-xq-back").click(function() {
      $(".page-hx-xiangqing").css("display", "none");
    });
    //户型鉴赏页打开户型鉴赏详情页，切换图片
    $(".page-huxing").on("click", ".hx-list", function() {
      var index = $(this).index() + 1;
      $(".hx-xq-2d").attr("src", "../images/ld/p0" + index + "_02.png");
      $(".hx-xq-title").attr("src", "../images/ld/w0" + index + ".png");
    });

    //
    $(".hx-xq-btn").on("click", ".btn", function() {
      $(this)
        .addClass("action")
        .siblings()
        .removeClass("action");
      var index = $(this).index();
      $(".hx-xq-btn").css("background-image", "url('../images/ld/qhbtn" + (index+1) + ".png')");
      $(".hx-xq")
        .eq(index)
        .addClass("action")
        .siblings()
        .removeClass("action");
    });

    var bgMusic = $("audio").get(0);
    var $btnMusic = $(".btn-music");
    var $upArrow = $(".up-arrow");

    // background music control
    $btnMusic.click(function() {
      if (bgMusic.paused) {
        bgMusic.play();
        $(this).removeClass("paused");
      } else {
        bgMusic.pause();
        $(this).addClass("paused");
      }
    });

    // init Swiper
    new Swiper(".swiper-container", {
      mousewheelControl: true,
      effect: "coverflow", // slide, fade, coverflow or flip
      speed: 400,
      direction: "vertical",
      fade: {
        crossFade: false
      },
      coverflow: {
        rotate: 100,
        stretch: 0,
        depth: 300,
        modifier: 1,
        slideShadows: false // do disable shadows for better performance
      },
      flip: {
        limitRotation: true,
        slideShadows: false // do disable shadows for better performance
      },
      onInit: function(swiper) {
        animationControl.initAnimationItems(); // get items ready for animations
        animationControl.playAnimation(swiper); // play animations of the first slide
      },
      onTransitionStart: function(swiper) {
        // on the last slide, hide .btn-swipe
        if (swiper.activeIndex === swiper.slides.length - 1) {
          $upArrow.hide();
        } else {
          $upArrow.show();
        }
      },
      onTransitionEnd: function(swiper) {
        // play animations of the current slide
        animationControl.playAnimation(swiper);
      },
      onTouchStart: function(swiper, event) {
        // mobile devices don't allow audios to play automatically, it has to be triggered by a user event(click / touch).
        if (!$btnMusic.hasClass("paused") && bgMusic.paused) {
          bgMusic.play();
        }
      }
    });

    // hide loading animation since everything is ready
    // 通过使用滑动效果，隐藏被选元素，如果元素已显示出来的话。
    $(".loading-overlay").slideUp();
  });
})();
