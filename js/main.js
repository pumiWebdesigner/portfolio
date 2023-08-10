'use strict'

{
    {// 画面上端の処理（高さ情報で監視）
        const header = document.querySelector('header');
        function scroll_effect() {
            if (window.scrollY === 0) {
                header.classList.remove('scrolled');
            } else {
                header.classList.add('scrolled');
            }
        }
        window.addEventListener('scroll', scroll_effect); // スクロール時に実行
    }
    {// ﾊﾝﾊﾞｰｶﾞｰﾒﾆｭｰの表示・非表示
        const header_menu = document.getElementById('header_menu');
        const hamBtn = document.getElementById('ham_btn');
        const h_open = document.getElementById('h_open');
        const h_close = document.getElementById('h_close');
        hamBtn.addEventListener('click', () => {
            header_menu.classList.toggle('show');
            h_open.classList.toggle('hidden');
            h_close.classList.toggle('show');
        });
        header_menu.addEventListener('click', () => {
            hamBtn.click();
        });
    }
    {// 画面下端の処理（高さ情報で監視）
        function scroll_effect() {
            // ｽｸﾛｰﾙしたﾋﾟｸｾﾙ（ﾍﾟｰｼﾞ全体の上端からｽｸﾛｰﾙ後の画面上端）
            var scrollY = window.scrollY;
            // 画面のサイズ
            var windowH = window.innerHeight;
            // スクロールできる最大値（ﾍﾟｰｼﾞ全体の高さ - ﾋﾞｭｰﾎﾟｰﾄの高さ）
            var scrollMaxY = document.documentElement.scrollHeight - windowH;
            // 下端まで閲覧してもらった場合の、感謝コメント（p要素）
            const thanksMessage = document.querySelector('#thanksMessage');

            // 最大ｽｸﾛｰﾙ実施＝ﾌｯﾀｰが画面下端に表示完了
            if (Math.abs(scrollY - scrollMaxY) <= 1) {
                thanksMessage.classList.add('show');
                thanksMessage.classList.add('kiran');
                window.removeEventListener('scroll', scroll_effect);
            }
        }
        window.addEventListener('scroll', scroll_effect);
    }
    {// ﾒｲﾝﾀｸﾞのﾌﾜｯと表示（observerで監視）
        // 要素の30%が見えたらcallback関数を実行
        const options = {
            threshold: 0.3,
        };
        const vertical_observer = new IntersectionObserver(vertical_callback, options);

        // vertical_slide_targetのクラスが付いた要素全てにobserverセット
        const vertical_tergetClassName = 'vertical_slide_target';
        const vertical_tergets = document.getElementsByClassName(vertical_tergetClassName);
        for (var i = 0; i < vertical_tergets.length; i++)
            vertical_observer.observe(vertical_tergets[i]);

        // 要素の30%が見えた時に実行するcallback関数
        // entriesはobserver設定された全要素、obsはobserver自体
        function vertical_callback(entries, obs) {
            for (var i = 0; i < entries.length; i++) {
                // 監視対象でなければreturn
                if (!entries[i].isIntersecting) return;
                //slideさせるクラス付与
                entries[i].target.classList.add('vertical_slide');
                // 監視終了
                obs.unobserve(entries[i].target);
            };
        };
    }
    {//実績表示場所（ｶﾙｰｾﾙ）
        var currentIndex = 0;
        const imagesContainer = document.getElementById("carousel_images_container");
        const next = document.getElementById("next");
        const prev = document.getElementById("prev");
        const slides = imagesContainer.children;
        // 画像下のドット（img要素の数分のﾎﾞﾀﾝ要素が格納される）
        const dots = [];
        // ﾄﾞｯﾄの初期設定
        setupDots();

        // ﾄﾞｯﾄの初期設定
        function setupDots() {
            for (let i = 0; i < slides.length; i++) {
                const button = document.createElement('button');
                button.addEventListener('click', () => {
                    currentIndex = i;
                    moveSlides();
                    updateDots();
                });
                dots.push(button);
                document.getElementById("carousel_dots_container").appendChild(button);
            }
            dots[0].classList.add('current');
        }
        // 右ﾎﾞﾀﾝをｸﾘｯｸした時のIndex更新処理、および、画面・ﾄﾞｯﾄ更新処理
        next.addEventListener('click', () => {
            currentIndex++;
            // 最右でさらにnextｸﾘｯｸ→最左
            if (currentIndex === 4) {
                currentIndex = 0;
            }
            moveSlides();
            updateDots();
        });
        // 左ﾎﾞﾀﾝをｸﾘｯｸした時の処理
        prev.addEventListener('click', () => {
            currentIndex--;
            // 最左でさらにprevｸﾘｯｸ→最右
            if (currentIndex === -1) {
                currentIndex = 3;
            }
            moveSlides();
            updateDots();
        });
        // Indexに対応する画像を表示
        function moveSlides() {
            const slideWidth = slides[0].getBoundingClientRect().width;
            imagesContainer.style.transform = `translateX(${-1 * currentIndex * slideWidth}px)`;
        }
        // Indexに対応するﾄﾞｯﾄを強調
        function updateDots() {
            dots.forEach(dot => {
                dot.classList.remove('current');
            });
            dots[currentIndex].classList.add('current');
        }
        // 画面ﾘｻｲｽﾞ時に画面がずれるので、再表示
        window.addEventListener('resize', () => {
            moveSlides();
        })
    }

}





///////////////////////////////
// jsでのcss操作
// ul.style.transform = `translateX(${-1 * currentIndex * slideWidth}px)`;
// jsでのHTML操作
// document.getElementById("age").innerHTML = nowyear - age;
///////////////////////////////
// });
// {//スライドショー
//     const thumbnails = document.querySelectorAll('.thumbnail');
//     const mainImage = document.getElementById('main-image');
//     const next = document.getElementById('ss-next');
//     const prev = document.getElementById('ss-prev');
//     let activeIndex = 0;

//     next.addEventListener('click', () => {
//         activeIndex++;
//         if (activeIndex === thumbnails.length) {
//             activeIndex = 0;
//         }
//         mainImage.src = thumbnails[activeIndex].src;

//         thumbnails[0].classList.remove('active');
//         thumbnails[1].classList.remove('active');
//         thumbnails[2].classList.remove('active');
//         thumbnails[activeIndex].classList.add('active');
//     });

//     prev.addEventListener('click', () => {
//         activeIndex--;
//         if (activeIndex < 0) {
//             activeIndex += thumbnails.length;
//         }
//         mainImage.src = thumbnails[activeIndex].src;
//         thumbnails[0].classList.remove('active');
//         thumbnails[1].classList.remove('active');
//         thumbnails[2].classList.remove('active');
//         thumbnails[activeIndex].classList.add('active');
//     });

//     thumbnails[0].addEventListener('click', () => {
//         thumbnails[0].classList.add('active');
//         thumbnails[1].classList.remove('active');
//         thumbnails[2].classList.remove('active');
//         mainImage.src = thumbnails[0].src;
//         activeIndex = 0;
//     });
//     thumbnails[1].addEventListener('click', () => {
//         thumbnails[0].classList.remove('active');
//         thumbnails[1].classList.add('active');
//         thumbnails[2].classList.remove('active');
//         mainImage.src = thumbnails[1].src;
//         activeIndex = 1;
//     });
//     thumbnails[2].addEventListener('click', () => {
//         thumbnails[0].classList.remove('active');
//         thumbnails[1].classList.remove('active');
//         thumbnails[2].classList.add('active');
//         mainImage.src = thumbnails[2].src;
//         activeIndex = 2;
//     });

// }
// {//アコーディオンメニュー
// //     const dts = document.querySelectorAll('dt');
// //     dts.forEach(dt => {
// //         dt.addEventListener('click', () => {
// //             dt.parentNode.classList.toggle('appear');

// //             dts.forEach(el => {
// //                 if (dt !== el) {
// //                     el.parentNode.classList.remove('appear');
// //                 }
// //             });
// //         });
// //     });
// }

// {//タブメニュー
// //     const bars = document.querySelectorAll('.tab_bar');
// //     bars.forEach(bar => {
// //         // bar.addEventListener('click',() => {
// //         // event.preventDefault タブクリックで画面遷移させない
// //         bar.addEventListener('click', function (event) {
// //             bars.forEach(elem => {
// //                 if (bar !== elem) {
// //                     elem.classList.remove('active');
// //                     document.getElementById(elem.dataset.id).classList.remove('active');
// //                 }
// //             });
// //             bar.classList.add('active');
// //             document.getElementById(bar.dataset.id).classList.add('active');
// //             // event.preventDefault タブクリックで画面遷移させない
// //             event.preventDefault();
// //         });
// //     })
// }

