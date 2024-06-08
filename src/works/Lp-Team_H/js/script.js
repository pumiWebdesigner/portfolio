// ページ外からの遷移
// ページがロードされた後にhash有無をチェックして処理
$(document).ready(function () {
  if (window.location.hash) {
    // URLのhashが遷移する先（例：#access）
    var hash = window.location.hash; // #～を取得
    // 遷移する先とheaderの高さからスクロールする距離を計算
    scrollDistance = calcDistance(hash);
    // スムーズスクロール
    smoothScroll(scrollDistance, 0);
  }
});
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
  // ドロワー背景（背景の背後をクリックさせない）
  jQuery(".js-drawer__background").on("click", function () {
    jQuery("body").removeClass("drawer-open");
  });
  //スクロール後処理__画面最上部からtargetの場所を超えたら着火（枝を動かす）
  jQuery(window).on("scroll", function () {
    var target = 500;
    if (jQuery(this).scrollTop() > target) {
      jQuery(".header").addClass("is-rotate");
    } else {
      jQuery(".header").removeClass("is-rotate");
    }
  });
}
// IntersectionObserver;
const intersectionObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("steps");
    } else {
    }
  });
});

const inViewItems = document.querySelectorAll(".js-in-view");
inViewItems.forEach(function (inViewItem) {
  intersectionObserver.observe(inViewItem);
});
