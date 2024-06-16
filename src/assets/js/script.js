jQuery(document).ready(function ($) {
  // スムーズスクロール
  // aタグのクリック（ドロワー関連は専用処理あり）
  jQuery('a[href^="#"]').on("click", function (e) {
    // aタグのhrefが遷移する先
    // .splitはその文字で区切って配列にする。[0]は＃より前、[1]は＃より後の文字列を取得する
    e.preventDefault(); // デフォルトのリンク動作を無効化
    var href = jQuery(this).attr("href");

    // ターゲット要素を取得
    var targetElement = jQuery(href);
    // ターゲット要素が存在する場合にスクロール処理を実行
    // 遷移する先とheaderの高さからスクロールする距離を計算
    var scrollDistance = calcDistance(targetElement);

    // スムーズスクロール
    smoothScroll(scrollDistance, 300);

    // ドロワーを閉じる
    if (jQuery(this).hasClass("js-drawer__nav--link")) {
      jQuery("body").removeClass("drawer-open");
    }
  });

  // 遷移する先とheaderの高さからスクロールする距離を計算
  function calcDistance(targetElement) {
    var scrollDistance = 0; // #は初期値0
    if (targetElement.length > 0) {
      var elementDistance = targetElement.offset().top; //画面最上部から要素の上端の距離
      var headerHeight = jQuery(".l-header").outerHeight(); // ヘッダーの高さ（マージン含む）
      scrollDistance = elementDistance - headerHeight; // ヘッダーの高さを考慮した位置にスクロール
    }
    return scrollDistance;
  }
  // 距離とスピードを渡してスムーズスクロール
  function smoothScroll(scrollDistance, speed) {
    jQuery("html,body").animate(
      {
        scrollTop: scrollDistance,
      },
      speed
    );
  }
  //ドロワーボタン（ハンバーガーボタン）
  jQuery("#js-drawer__btn").on("click", function (e) {
    e.preventDefault();
    jQuery("body").toggleClass("drawer-open");
  });

  //スクロール後処理__画面最上部からtargetの場所を超えたら起動
  jQuery(window).on("scroll", function () {
    // target：スマホのheader色、to-topボタン
    var target = 300;
    if (jQuery(this).scrollTop() > target) {
      jQuery("body").addClass("is-scroll");
    } else {
      jQuery("body").removeClass("is-scroll");
    }
  });

  //閉じるボタン
  jQuery(".js-closeBtn").on("click", function () {
    window.close();
  });
});
