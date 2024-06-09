$(document).ready(function () {
  //ｽﾑｰｽﾞｽｸﾛｰﾙ(aﾀｸﾞ_ｸﾘｯｸ)
  jQuery('a[href^="#"]').on("click", function () {
    if (jQuery(this).hasClass("js-open-button")) {
      return;
    }
    var header = jQuery(".header").innerHeight();
    var id = jQuery(this).attr("href");
    // #は初期値0,#以外はoffset().top
    var position = 0;
    if (id != "#") {
      position = jQuery(id).offset().top - header;
    }
    jQuery("html,body").animate(
      {
        scrollTop: position,
      },
      300
    );
  });

  jQuery(".js-input").on("input", function () {
    if (jQuery(this).val().trim() === "") {
      jQuery(this).removeClass("is-active");
      jQuery(".contact-form__button").removeClass("full-inputs");
      return;
    }
    jQuery(this).addClass("is-active");
    if (jQuery(".js-input").length === jQuery(".is-active").length) {
      jQuery(".contact-form__button").addClass("full-inputs");
    }
  });

  $(document).ready(function () {
    $(".drawer").drawer();
  });
});
