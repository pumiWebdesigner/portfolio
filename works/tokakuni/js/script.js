$(document).ready(function () {
  // wow.js（ﾌﾜｯと表示）
  new WOW().init();

  //drawer(header)
  jQuery("#js-drawer").on("click", function (e) {
    e.preventDefault();
    jQuery("#js-header").toggleClass("drawer-open");
  });
  jQuery(".js-nav-link, .drawer-background").on("click", function (e) {
    e.preventDefault();
    jQuery("#js-header").removeClass("drawer-open");
  });

  //swiper(results)
  new Swiper(".swiper-container", {
    speed: 400,
    spaceBetween: 40,
    width: 400,
    loop: true,
    loopedSlides: 6, //6個目の先に1個目を表示してくれる
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    breakpoints: {
      768: {
        spaceBetween: 24,
        width: 274,
      },
    },
  });

  //ｱｺｰﾃﾞｨｵﾝ(faq)
  $(".js-faqs").on("click", function () {
    $(this).find(".js-faqA").stop().slideToggle(300);
    $(this).toggleClass("is-open");
  });

  {
    //スクロール後処理__heroを超えたら着火（headerのopacityを上げ、to-topを表示）
    jQuery(window).on("scroll", function () {
      let target = $("#js-hero").outerHeight();
      if (jQuery(this).scrollTop() > target) {
        jQuery("body").addClass("add-scrolled");
      } else {
        jQuery("body").removeClass("add-scrolled");
      }
    });
  }

  //ｽﾑｰｽﾞｽｸﾛｰﾙ(#から始まるaﾀｸﾞがｸﾘｯｸされた時)
  jQuery('a[href^="#"]').on("click", function (e) {
    // 移動速度を指定（ミリ秒）
    let speed = 500;
    // hrefで指定されたidを取得
    var href = jQuery(this).attr("href");
    // hrefの値が#のみor空白だったらターゲットをhtmlタグにする
    let target = jQuery(href === "#" || href === "" ? "html" : href);
    // ページのトップを基準にターゲットの位置を取得
    let position = target.offset().top - $("#js-header").outerHeight();
    //swingは最初と最後をゆっくり　linearは一定
    jQuery("html,body").animate({ scrollTop: position }, speed, "swing");
    e.preventDefault();
  });

  //formで送信
  let $form = jQuery("#js-form");
  let $content = jQuery(".contact-content");
  $form.submit(function (e) {
    $.ajax({
      url: $form.attr("action"),
      data: $form.serialize(),
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          //送信に成功したときの処理
          $content.slideUp();
          jQuery("#js-success").slideDown();
        },
        200: function () {
          //送信に失敗したときの処理
          $content.slideUp();
          jQuery("#js-error").slideDown();
        },
      },
    });
    return false;
  });

  // (function () {
  var requireFlg = false;
  var privacyFlg = false;
  var $require = $("#js-form .js-require");
  var fillCount = 0;
  // js-requireの要素、privecyのチェックが両方Trueなら送信可
  function setSubmitProp() {
    if (requireFlg && privacyFlg) {
      $("#form-submit").prop("disabled", false);
    } else {
      $("#form-submit").prop("disabled", true);
    }
  }
  //blurは入力完了後（＝フォーカスを失った時）
  //^文字列の開始、$文字列の終了、([ァ-ン]|ー)、カタカナ＋長音、+１回以上の繰り返し　これらを/で囲むと正規表現になる
  $require.on("blur", function () {
    if (
      $(this).attr("id") === "js-form-kana" &&
      !$(this)
        .val()
        .match(/^([ァ-ン]|ー)+$/)
    ) {
      $(this).val("");
      alert("全角カタカナで入力してください。");
    }
    // js-requireの要素が、空白、空白文字、タブでない場合、fillcount++
    // eachで全てのjs-requireの要素を確認する
    $require.each(function () {
      var value = $(this).val();
      if (value !== "" && value.match(/[^\s\t]/)) {
        fillCount++;
      }
    });

    // 全てのjs-requireの要素がtrueならflagをtrueにする
    requireFlg = fillCount === $require.length ? true : false;
    setSubmitProp();
    fillCount = 0;
  });
  $("#form-privacy").on("change", function () {
    privacyFlg = $(this).prop("checked") ? true : false;
    setSubmitProp();
  });

  $("#js-form").on("submit", function () {
    if (!(requireFlg && privacyFlg)) {
      alert("入力に誤りがあります。");
      return false;
    }
  });
});
