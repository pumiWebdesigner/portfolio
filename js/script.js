// $("#js-button-drawer").on("click", function () {

//   $(this).toggleClass("is-checked");

//   $("#js-drawer").slideToggle();

//   $("body").toggleClass("is-fixed");

// });

{
  // aタグ制御
  // ⇒ドロワー関連は専用処理
  jQuery('a[href^="#"]').on("click", function (e) {
    // ドロワーナビをクリックしたときは、リンク移動後にドロワーを閉じる
    if (jQuery(this).hasClass("js-drawer__nav--link")) {
      // リンクへの移動後もドロワーを閉じる処理をしたいので、通常の処理を止める
      e.preventDefault();
    }

    // headerの高さを取得（スクロール先は要素の場所よりheader分下の位置）
    var header = jQuery(".header").innerHeight();
    // スクロール先のhrefを取得
    var id = jQuery(this).attr("href");

    // スクロールする距離
    // #は初期値0,#以外は要素の高さ（headerの高さも考慮）
    var position = 0;
    if (id != "#") {
      position = jQuery(id).offset().top - header;
    }
    // href設定のリンクへスクロールする
    jQuery("html,body").animate(
      {
        scrollTop: position,
      },
      300
    );
    // ドロワーを閉じる
    if (jQuery(this).hasClass("js-drawer__nav--link")) {
      jQuery(".header").removeClass("drawer-open");
    }
  });

  //ドロワーボタン（ハンバーガーボタン）クリック時
  jQuery("#js-drawer__btn").on("click", function (e) {
    e.preventDefault();
    jQuery(".header").toggleClass("drawer-open");
  });
}
