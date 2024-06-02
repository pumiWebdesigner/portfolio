{
  // form全体
  const form = jQuery(".wpcf7-form");

  // form送信ボタン
  const submit = jQuery(".js-submit");

  // 送信ボタンは初期値disabled
  submit.prop("disabled", true);

  // form.submit(function () {
  //   jQuery.ajax({
  //     url: form.attr("action"),
  //     data: form.serialize(),
  //     type: "POST",
  //     dataType: "xml",
  //     statusCode: {
  //       0: function () {
  //         //送信に成功したときの処理
  //         if (form.hasClass("js-contact")) {
  //           window.location.href = "./thanks/contact.html";
  //           alert("送信しました。");
  //         } else if (form.hasClass("js-reservation")) {
  //           window.location.href = "./thanks/reservation.html";
  //           alert("予約しました。");
  //         }
  //       },
  //       200: function () {
  //         //送信に失敗したときの処理
  //         window.location.href = "./index.html";
  //       },
  //     },
  //   });
  //   return false;
  // });

  // required属性の付与
  form.find(".wpcf7-validates-as-required").attr("required", true);

  form.on("input change", function () {
    // checkboxはrequired設定されているcheckboxのみをチェック対象としてしまうので、
    // Radio,checkbox,selectは個別のバリデーションチェックを行う

    if (form.get(0).checkValidity()) {
      // 一旦バリデーションチェックOKにするけど、追加チェック次第で再度NGにする
      submit.prop("disabled", false);
      if (window.location.href.includes("reservation")) {
        if (jQuery('input[type="radio"]:checked').length === 0) submit.prop("disabled", true);
        else if (jQuery('input[type="checkbox"]:checked').length === 0) submit.prop("disabled", true);
        else if (jQuery(".js-select").val() === "ご連絡方法を選択ください。") submit.prop("disabled", true);
      }
    } else {
      submit.prop("disabled", true);
    }
  });

  // contact,reserve共通のバリデーション
  // safari：✘ready,○load、✘blur,○change
  jQuery(window).on("load", function () {
    var $require = jQuery(".wpcf7-form [required]");
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
      if ($this.hasClass("js-radio")) {
        if (jQuery('input[type="radio"]:checked').length === 0) {
          $errorMessage.text("初診・再診どちらか選んでください。").show();
        } else {
          $errorMessage.hide(); // 条件を満たす場合はエラーメッセージを隠す
        }
      }
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

  checkbox: jQuery(document).ready(function () {
    var jQuerycheckbox = jQuery(".js-checkbox");
    jQuerycheckbox.on("change", function () {
      var $this = jQuery(this);
      var $errorMessage = $this.closest(".wpcf7-form-control-wrap").next(".error-message"); //thisに対するエラーメッセージの要素

      // チェックボックスのバリデーション
      if ($this.hasClass("js-checkbox")) {
        if (jQuery('input[type="checkbox"]:checked').length === 0) {
          $errorMessage.text("一つ以上の診療内容を選んでください。").show();
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
