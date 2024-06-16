{
  // ページ内の遷移
  // aタグのクリック（ドロワー関連は専用処理あり）
  jQuery('a[href^="#"]').on("click", function (e) {
    e.preventDefault(); // aタグの通常の処理を止める
    // aタグのhrefが遷移する先
    var id = jQuery(this).attr("href"); // スクロール先のhrefを取得
    // 遷移する先とheaderの高さからスクロールする距離を計算
    scrollDistance = calcDistance(id);
    // スムーズスクロール
    smoothScroll(scrollDistance, 300);
    // ドロワーを閉じる
    if (jQuery(this).hasClass("js-drawer__nav--link")) {
      jQuery("body").removeClass("drawer-open");
    }
  });
  // 遷移する先とheaderの高さからスクロールする距離を計算
  function calcDistance(id) {
    var scrollDistance = 0; // #は初期値0
    if (id != "#") {
      // id == "#"の場合、elementDistanceの取得でエラーになるので場合分けする
      var elementDistance = $(id).offset().top; //画面最上部から要素の上端の距離
      var headerHeight = $(".header").outerHeight(); // ヘッダーの高さ（マージン含む）
      if ($(window).width() >= 1024) {
        headerHeight = 0; // PCサイズでheaderHeightを0に設定
      }
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
}
