{
  // メニューのホバー処理

  // PCのホバーメニュー表示
  // 条件：家具・家電がホバーされたら
  jQuery(".js-header__menu").hover(
    function () {
      if ($(window).width() >= 768) {
        // 既に表示されていたら非表示にする
        jQuery(".js-header__menu").removeClass("is-hover");
        // ホバーされた配下のホバーメニューを表示する
        jQuery(this).addClass("is-hover");
      }
    },
    function () {} // hover解除時の処理は無し
  );
  // PCのホバーメニュー非表示
  // 条件：家具・家電、もしくはホバーメニューがクリックされたら
  jQuery(".js-header__menu").on("click", function () {
    if ($(window).width() >= 768) {
      jQuery(".js-header__menu").removeClass("is-hover");
    }
  });

  // スマホのホバーメニュー表示
  // スマホのホバーメニュー非表示
  // 条件：共に家具・家電がクリックされたら
  jQuery(".js-header__menu").on("click", function () {
    if ($(window).width() < 768) {
      if (!jQuery(this).hasClass("is-hover")) {
        // ホバーメニュー非表示時、他のホバーメニューが表示されていたら非表示にする
        jQuery(".js-header__menu").removeClass("is-hover");
        // ホバーメニュー非表示時、表示する
        jQuery(this).addClass("is-hover");
      } else {
        // ホバーメニュー表示時は、他のホバーメニュー含め非表示にする
        jQuery(".js-header__menu").removeClass("is-hover");
      }
    }
  });
}
