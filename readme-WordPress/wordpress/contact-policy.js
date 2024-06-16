{
  document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.querySelector('input[name="privacy-policy"]');
    const privacySpan = document.querySelector(".privacy-span");

    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        privacySpan.classList.add("checked");
      } else {
        privacySpan.classList.remove("checked");
      }
    });
  });
}
