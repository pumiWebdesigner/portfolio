{
  // form全体
  const form = jQuery("#js-form");
  // form送信ボタン
  const submit = jQuery("#js-submit");
  // 送信ボタンは初期値disabled
  submit.prop("disabled", true);
  // const email = jQuery(".input-email");
  // email.prop("invalid", false);
  form.submit(function () {
    $.ajax({
      url: form.attr("action"),
      data: form.serialize(),
      type: "POST",
      dataType: "xml",
      statusCode: {
        0: function () {
          //送信に成功したときの処理
          form.slideUp();
          jQuery("#js-success").slideDown();
        },
        200: function () {
          //送信に失敗したときの処理
          form.slideUp();
          jQuery("#js-error").slideDown();
        },
      },
    });
    return false;
  });

  form.on("change", function () {
    // jQueryは直接chedkValidity()をformに対して使用できない
    // 対象のDOM要素を取得（.get(0)や[0]を使用してから）checkValidityを行う
    if (form.get(0).checkValidity()) {
      submit.prop("disabled", false);
    } else {
      submit.prop("disabled", true);
    }
  });
}
