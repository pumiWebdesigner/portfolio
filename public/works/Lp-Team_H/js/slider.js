const splide = new Splide(".splide", {
  autoplay: true, // 自動再生
  type: "loop", // ループ
  pauseOnHover: false, // カーソルが乗ってもスクロールを停止させない
  pauseOnFocus: false, // 矢印をクリックしてもスクロールを停止させない
  interval: 4000, // 自動再生の間隔
  speed: 2000, // スライダーの移動時間

  breakpoints: {
    767: {
      padding: "0%", // スライダーの左右の余白
      gap: 0, // スライド間の余白
    },
    12000: {
      padding: "10%", // スライダーの左右の余白
      gap: 40, // スライド間の余白
    },
  },
}).mount();

Swiper;
var swiper = new Swiper(".swiper", {
  autoplay: {
    delay: 0,
  },
  loop: true,
  speed: 8000,
  centeredSlides: true,
  preventInteractionOnTransition: true,
  breakpoints: {
    0: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 5,
    },
  },
});
