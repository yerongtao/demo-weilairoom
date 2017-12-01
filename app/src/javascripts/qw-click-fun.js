var $ = require('jquery');

module.exports = {
    qwBtnClick: function() {
        $(".qw-btn").on("click", "a", function() {
            $(this)
              .addClass("action")
              .siblings()
              .removeClass("action");
            var index = $(this).index();
            $(".qw-list")
            .eq(index)
            .addClass("action")
            .siblings()
            .removeClass("action");
        });
    },
    qwBtnDX: function() {
        $(".qw-btn-d-x").on("click", "a", function() {
            $(this)
              .addClass("action")
              .siblings()
              .removeClass("action");
            var index = $(this).index();
            var qwList = $('.qw-da').hasClass('action');
            if(qwList) {
                // $(".qw-img-j").attr("src", "../images/ld_qwjt/qw1lx" + (index + 1) + ".png");
                $(".qw-img-j")
                .eq(index)
                .addClass("action")
                .siblings()
                .removeClass("action");
            }
            else {
                // $(".qw-img-j").attr("src", "./images/ld_qwjt/qw2lx" + (index + 1) + ".png");
                $(".qw-img-k")
                .eq(index)
                .addClass("action")
                .siblings()
                .removeClass("action");
            }
              
        });
    }
}