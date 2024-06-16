{
  // form全体
  const form = jQuery(".wpcf7-form");

  // form送信ボタン
  const submit = jQuery(".js-submit");
  if (!form.length || !submit.length) return;
  // 送信ボタンは初期値disabled
  submit.prop("disabled", true);

  // 送信実行時の処理はCONTACT FORM 7の設定で行う

  // required属性の付与
  form.find(".wpcf7-validates-as-required").attr("required", true);

  form.on("input change", function () {
    // checkboxはrequired設定されているcheckboxのみをチェック対象としてしまうので、
    // checkbox,selectは個別のバリデーションチェックを行う

    if (form.get(0).checkValidity()) {
      // 一旦バリデーションチェックOKにするけど、追加チェック次第で再度NGにする
      submit.prop("disabled", false);
      if (jQuery('input[type="checkbox"]:checked').length === 0) submit.prop("disabled", true);
    } else {
      submit.prop("disabled", true);
    }
  });

  // contact,reserve共通のバリデーション
  // safari：✘ready,○load、✘blur,○change
  jQuery(window).on("load", function () {
    var $require = jQuery(".wpcf7-form [required]");
    if ($require.length === 0) return;
    $require.on("change", function () {
      var $this = jQuery(this);
      // input要素が単体：input要素のnextにエラーメッセージ
      var $errorMessage = $this.closest(".wpcf7-form-control-wrap").next(".error-message"); //thisに対するエラーメッセージの要素

      // お名前、お問い合わせ内容のバリデーション
      if ($this.hasClass("js-text")) {
        // お名前、お問い合わせ内容が入力必須の場合は、空文字か否かのチェックのみ行う
        // trimで空白を削除し、空白削除後が空文字かチェック
        if ($this.val().trim() === "") {
          $errorMessage.text("このフィールドは必須です。").show();
        } else {
          $errorMessage.hide(); // 条件を満たす場合はエラーメッセージを隠す
        }
      }

      // カナ入力のバリデーション
      if ($this.hasClass("js-kana")) {
        // カナ入力のパターン
        var kanaPattern = /^([ァ-ンー\s]+)$/;
        // カタカナ、長音符、空白以外が入っていた際の処理
        if (!$this.val().match(kanaPattern)) {
          $errorMessage.text("全角カタカナ（スペース含む）で入力してください。").show();
        } else {
          $errorMessage.hide(); // 条件を満たす場合はエラーメッセージを隠す
        }
      }
      // 電話番号のバリデーション
      if ($this.hasClass("js-tel-number")) {
        // 電話番号のパターン
        var telPattern = /^\+?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,4}[-\s]?\d{1,4}$/;
        if (!$this.val().match(telPattern)) {
          $errorMessage.text("有効な電話番号を入力してください。（例: 0123-456-789）").show();
        } else {
          $errorMessage.hide(); // 条件を満たす場合はエラーメッセージを隠す
        }
      }
      // メールアドレスのバリデーション
      if ($this.hasClass("js-mail")) {
        // メールアドレスのパターン
        var mailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!$this.val().match(mailPattern)) {
          $errorMessage.text("有効なメールアドレスを入力してください。（例: user@example.com）").show();
        } else {
          $errorMessage.hide(); // 条件を満たす場合はエラーメッセージを隠す
        }
      }
      // ラジオボタンのバリデーション
      // 初期設定されており、選択されていたい状態に戻せないのでバリデーションチェックしない

      // セレクトボックスのバリデーション
      if ($this.hasClass("js-select")) {
        if ($this.val() === "ご連絡方法を選択ください。") {
          $errorMessage.text("プルダウンよりご連絡方法を選んでください。").show();
        } else {
          $errorMessage.hide(); // 条件を満たす場合はエラーメッセージを隠す
        }
      }
    });
  });

  // checkbox:ラジオボタンと違って、何も選ばない状態に戻せる
  jQuery(document).ready(function () {
    var jQuerycheckbox = jQuery(".js-checkbox");
    jQuerycheckbox.on("change", function () {
      var $this = jQuery(this);
      // var $errorMessage = $this.closest(".wpcf7-form-control-wrap").next(".error-message"); //thisに対するエラーメッセージの要素
      var $errorMessage = $this.closest(".js-form--wrapper").next(".error-message"); //thisに対するエラーメッセージの要素

      // チェックボックスのバリデーション
      if ($this.hasClass("js-checkbox")) {
        if (jQuery('input[type="checkbox"]:checked').length === 0) {
          $errorMessage.text("チェックされておりません。").show();
        } else {
          $errorMessage.hide(); // 条件を満たす場合はエラーメッセージを隠す
        }
      }
    });
  });

  // date:入力後もplaceholderが表示され続ける＆入力値が表示されない問題への対処
  jQuery(document).ready(function () {
    var jQuerydate = jQuery("input[type='date']");
    jQuerydate.on("input", function () {
      if (jQuery(this).val().trim() !== "") {
        jQuery(this).addClass("is-input");
      } else {
        jQuery(this).removeClass("is-input");
      }
    });
  });

  // date:firefoxのみ標準のラジオボタンを消せないので、標準のラジオボタンを使うためのクラスを追加する
  jQuery(document).ready(function () {
    var ua = navigator.userAgent.toLowerCase(); // userAgentの取得と小文字に統一
    if (ua.indexOf("firefox") !== -1) {
      jQuery("body").addClass("firefox");
    }
  });
}

{
  document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.querySelector('input[name="privacy-policy"]');
    const privacySpan = document.querySelector(".privacy-span");
    if (!checkbox || !privacySpan) return;
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        privacySpan.classList.add("checked");
      } else {
        privacySpan.classList.remove("checked");
      }
    });
  });
}
