// openボタンの次要素がdialogタグである必要あり
// openボタン ：でモーダル表示
// closeボタン：でモーダル非表示
// linkボタン ：でモーダル非表示＆リンク先へ遷移
// モーダル表示時は背景スクロール無効化
// モーダル閉じたらスクロール無効化解除
// htmlタグにoverflow: hidden;を設定することでスクロール無効
// htmlタグのoverflow: revert;でスクロール無効解除

const openButtons = document.querySelectorAll(".js-modal__btn--open");
const closeButtons = document.querySelectorAll(".js-modal__btn--close");
const linkButtons = document.querySelectorAll(".js-modal__btn--link");

// openボタン ：でモーダル表示
openButtons.forEach(function (openButton) {
  openButton.addEventListener("click", function () {
    // openボタンの次要素がdialogタグである必要あり
    const dialog = this.nextElementSibling; // nextElementSibling:同じ階層の次の兄弟要素
    dialog.showModal(); // showModal()は背景を含むモーダル表示、show()は背景を含まない　　// javascriptで使用可能　jQueryで使うには一工夫必要
    // モーダル表示時は背景スクロール無効化
    document.documentElement.style.overflow = "hidden";
  });
});

// closeボタン：でモーダル非表示
// ↑の機能自体は標準機能であるため、closeボタンの記述は不要

// linkボタン ：でモーダル非表示＆リンク先へ遷移
// buttonクリック以外でshowmodalを閉じれない
// 画面更新でshowmodalを擬似的に閉じる
jQuery(".js-modal__btn--link").on("click", function (e) {
  e.preventDefault(); // aタグの通常の処理を止める
  var id = jQuery(this).attr("href"); // 遷移先のhrefを取得
  window.open(id, "_blank"); // idに設定されたURLを別タブで開く
  location.reload(); // 画面を更新する（＝modalを消す）　  //revertだとスクロール無効解除されない（遷移先のページが解除される？）
});

// モーダル閉じたらスクロール無効化解除
closeButtons.forEach(function (modalCloseButton) {
  modalCloseButton.addEventListener("click", function () {
    // htmlタグのoverflow: revert;でスクロール無効解除
    document.documentElement.style.overflow = "revert";
    // document.documentElement.removeAttribute("style");
  });
});
