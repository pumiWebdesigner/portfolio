{
  // アコーディオン
  jQuery(".js-faq").on("click", function () {
    // jQuery(this).find(".faq__answer").slideToggle();

    // var answer = jQuery(this).find(".faq__answer");
    // if (answer.css("display") === "none") {
    //   answer.css("display", "flex");
    // } else {
    //   answer.css("display", "none");
    // }
    jQuery(this).toggleClass("is-open");
  });
}
