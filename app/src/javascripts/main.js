(function() {
  "use strict";

  // load dependencies
  var animationControl = require("./animation-control.js");
  // load text.js
  // var text = require('./text.js');
  // load three.js
  // var three = require('./lib/three.min.js');
  // var stats = require('./lib/stats.min.js');
  // var OBJLoader = require('./loader/OBJLoader.js');
  // var MTLLoader = require('./loader/MTLLoader.js');
  // var OrbitControls = require('./controls/OrbitControls.js');
  // var hxXq3d = require('./hx-xq-3d.js');

  $(document).ready(function() {
    init();
    // 下方导航 menu-main 的切换
    $(".menu-main").on("click", "li", function() {
      $(this)
        .addClass("action")
        .siblings()
        .removeClass("action");
      var index = $(this).index();
      // console.log(index);
      $(".page").css("display", "none");
      $(".page")
        .eq(index)
        .css("display", "block");
      $(".page-hx-xiangqing").css("display", "none");
    });
    // 户型鉴赏查看详情按钮打开户型鉴赏详情页
    $(".hx-btn").click(function() {
      $(".page-hx-xiangqing").css("display", "block");
    });
    $(".hx-xq-back").click(function() {
      $(".page-hx-xiangqing").css("display", "none");
    });
    $(".hx-btn-1").click(function() {
      $(".hx-xq-2d").attr("src", "../images/ld/p02_02.png");
      $(".hx-xq-title").attr("src", "../images/ld/w01.png");
    });
    $(".hx-btn-2").click(function() {
      $(".hx-xq-2d").attr("src", "../images/ld/p02_02.png");
      $(".hx-xq-title").attr("src", "../images/ld/w02.png");
    });
    //
    $(".hx-xq-btn").on("click", ".btn", function() {
      $(this)
        .addClass("action")
        .siblings()
        .removeClass("action");
      var index = $(this).index() - 1;
      $(".hx-xq")
        .eq(index)
        .addClass("action")
        .siblings()
        .removeClass("action");
      $(".hx-xq-btn-img").attr("src", "../images/ld/qhbtn" + (index + 1) + ".png");
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
