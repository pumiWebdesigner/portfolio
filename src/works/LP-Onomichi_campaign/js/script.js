{
  //drawer
  jQuery(".js-drawer").on("click", function (e) {
    e.preventDefault();
    jQuery(this).toggleClass("is-open");
    jQuery(".drawer__nav").toggleClass("is-open");
  });
  jQuery(".drawer__nav")
    .find("a")
    .on("click", function (e) {
      e.preventDefault();
      jQuery(".js-drawer").toggleClass("is-open");
      jQuery(".drawer__nav").toggleClass("is-open");
      var href = jQuery(this).attr("href"); // aタグのhref属性を取得
      window.location.href = href; // href属性のURLへ遷移
    });

  //switer
  const aboutSwiper = new Swiper(".about__swiper", {
    loop: true,
    loopedSlides: 20, //2倍の枚数を指定する必要あり20＝10*2
    spaceBetween: 10,
    slidesPerView: "auto",
    speed: 4000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
  });
  const spotsSwiper = new Swiper(".spots__swiper", {
    loop: true,
    loopedSlides: 14, //2倍の枚数を指定する必要あり
    spaceBetween: 16,
    slidesPerView: 1.53,
    centeredSlides: true,
    breakpoints: {
      // 571px以上の場合 (=375と768の間)
      571: {
        spaceBetween: 24,
        slidesPerView: 2.4,
        centeredSlides: true,
      },

      // 768px以上の場合
      768: {
        spaceBetween: 28,
        slidesPerView: 2.8,
        centeredSlides: false,
      },
      // 1024px以上の場合
      1024: {
        spaceBetween: 30,
        slidesPerView: 3.0,
        centeredSlides: false,
      },
      // 1268px以上の場合
      1268: {
        spaceBetween: 32,
        slidesPerView: 3.223,
        centeredSlides: false,
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // spotスライダーの高さ揃え
  function adjustSlideHeight() {
    jQuery(".js-swiper-slide").each(function () {
      jQuery(this).css({
        height: "auto",
      });
    });
    // 全スライドを参照して、高さの最大値を探す
    var maxHeight = 0;
    jQuery(".js-swiper-slide").each(function () {
      var height = jQuery(this).height();
      if (maxHeight < height) {
        maxHeight = height;
      }
    });
    // 全スライドに、高さの最大値を適用する
    jQuery(".js-swiper-slide").each(function () {
      jQuery(this).css({
        height: maxHeight,
      });
    });
  }
  // サイズ変更時（初回表示時も含む）にスライダーの高さを揃える
  spotsSwiper.on("resize", function () {
    adjustSlideHeight();
  });

  jQuery(".prize__item-number").each(function (index) {
    jQuery(this).attr("data-number", index + 1);
  });

  const modalButtons = document.querySelectorAll(".js-modal-button");

  modalButtons.forEach(function (modalButton) {
    modalButton.addEventListener("click", function () {
      // nextElementSibling:同じ階層の次の兄弟要素（表示させる場所）
      const dialog = this.nextElementSibling;
      dialog.showModal();
    });
  });
}

// smoothscroll
// #から始まるURLがクリックされた時
// headerの高さを考慮
jQuery('a[href^="#"]').on("click", function () {
  // 移動速度を指定（ミリ秒）
  let speed = 300;
  // hrefで指定されたidを取得
  var id = jQuery(this).attr("href");
  // idの値が#のみだったらターゲットをhtmlタグにしてトップへ戻るようにする
  let target = jQuery("#" == id ? "html" : id);
  // ページのトップを基準にターゲットの位置を取得
  let position = jQuery(id).offset().top;
  // ターゲットの位置までspeedの速度で移動
  console.log(this);
  // Prizesの共通部分は、#Prizesより上にabosoluteで設置していた
  if ('a[href^="#prizes"]') {
    jQuery("html,body").animate(
      {
        scrollTop: position - 200,
      },
      speed
    );
  } else {
    jQuery("html,body").animate(
      {
        scrollTop: position - $(".header").outerHeight(),
      },
      speed
    );
  }
  return false;
});

let $form = jQuery("#js-form");
$form.submit(function () {
  $.ajax({
    url: $form.attr("action"),
    data: $form.serialize(),
    type: "POST",
    dataType: "xml",
    statusCode: {
      0: function () {
        //送信に成功したときの処理
        $form.slideUp();
        jQuery("#js-success").slideDown();
      },
      200: function () {
        //送信に失敗したときの処理
        $form.slideUp();
        jQuery("#js-error").slideDown();
      },
    },
  });
  return false;
});

let $submit = jQuery("#js-submit");
jQuery("#js-form input,#js-form select,#js-form textarea").on("change", function () {
  if (
    jQuery('#js-form input[type="text"]').val() !== "" &&
    jQuery('#js-form input[type="email"]').val() !== "" &&
    jQuery('#js-form select[name="entry.1063864133"]').val() !== "-" &&
    jQuery("#js-form textarea").val() !== "" &&
    jQuery('#js-form input[name="entry.550308529"]').prop("checked") === true
  ) {
    // 全て入力された時
    $submit.prop("disabled", false);
  } else {
    // 入力されていない時
    $submit.prop("disabled", true);
  }
  return false;
});
// 入力後に空白はエラー
jQuery('#js-form input[type="text"]').on("change", function () {
  if (jQuery('#js-form input[type="text"]').val() !== "") {
    jQuery('#js-form input[type="text"]').removeClass("error");
  } else {
    jQuery('#js-form input[type="text"]').addClass("error");
  }
});
// 入力後に空白はエラー
jQuery('#js-form input[type="email"]').on("change", function () {
  if (jQuery('#js-form input[type="email"]').val() !== "") {
    jQuery('#js-form input[type="email"]').removeClass("error");
  } else {
    jQuery('#js-form input[type="email"]').addClass("error");
  }
});
// 入力後に初期値はエラー
jQuery("#js-form select").on("change", function () {
  if (jQuery("#js-form select").val() !== "-") {
    jQuery("#js-form select").removeClass("error");
  } else {
    jQuery("#js-form select").addClass("error");
  }
});
// 入力後に空白はエラー
jQuery("#js-form textarea").on("change", function () {
  if (jQuery("#js-form textarea").val() !== "") {
    jQuery("#js-form textarea").removeClass("error");
  } else {
    jQuery("#js-form textarea").addClass("error");
  }
});
//details、summary
const animTiming = {
  duration: 400,
  easing: "ease-out",
};
// close処理
const closingAnimKeyframes = (content) => [
  // height: "auto"だとうまく計算されない
  { height: content.offsetHeight + "px", opacity: 1 },
  { height: 0, opacity: 0 },
];
// open処理
const openingAnimKeyframes = (content) => [
  { height: 0, opacity: 0 },
  { height: content.offsetHeight + "px", opacity: 1 },
];
const openingAnimKeyframes2 = () => [{ content: "＋" }, { content: "＊" }];

const summaries = document.querySelectorAll(".js-summary");
summaries.forEach(function (summary) {
  summary.addEventListener("click", (e) => {
    e.preventDefault();
    // detailsのopen属性を判定(アコーディオンを閉じるときの処理)
    if (summary.parentElement.open) {
      // アニメーションを実行 nextElementSibling:次の兄妹要素
      const closingAnim = summary.nextElementSibling.animate(closingAnimKeyframes(summary.nextElementSibling), animTiming);
      // アニメーションの完了後にopen属性を取り除く
      closingAnim.onfinish = () => {
        // open属性を削除
        summary.parentElement.removeAttribute("open");
        summary.classList.remove("is-open");
      };
    }
    // detailsのopen属性を判定(アコーディオンを開くときの処理)
    else {
      // open属性を付与
      summary.parentNode.setAttribute("open", "true");
      // アニメーションを実行
      // const openingAnim = summary.nextElementSibling.animate(openingAnimKeyframes(summary.nextElementSibling), animTiming);
      summary.nextElementSibling.animate(openingAnimKeyframes(summary.nextElementSibling), animTiming);
      summary.classList.add("is-open");
    }
  });
});

//footer__pagetop(ｽｸﾛｰﾙ後にﾎﾞﾀﾝ表示）
jQuery(window).on("scroll", function () {
  if (100 < jQuery(this).scrollTop()) {
    jQuery(".footer__pagetop").addClass("is-show");
  } else {
    jQuery(".footer__pagetop").removeClass("is-show");
  }
  return false;
});
