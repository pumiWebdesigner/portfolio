<?php 
// 基本的な設定を読み込む
function my_setup() {
    // アイキャッチ画像を使用する
    add_theme_support('post-thumbnails');
    // 自動フィードリンクをサポートする
    add_theme_support('automatic-feed-links');
    // headタグのtitleタグ、descriptionをWordPressの管理画面から変更できるようにする
    add_theme_support('title-tag');
    // HTML5の要素をサポートする
    add_theme_support('html5', array( 'comment-list', 'comment-form', 'search-form', 'gallery', 'caption', 'style', 'script' ));
}
add_action("after_setup_theme", "my_setup");

// CSS、JSを読み込む
function my_script_init() {
    wp_enqueue_style("swiper-cdn-css", "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css", array(), "11.0.6", "all");
    wp_enqueue_style("font-awesome", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css", array(), "6.4.2", "all");
    wp_enqueue_style("wow-css", get_template_directory_uri() . "/assets/css/animate.css", array(), filemtime(get_theme_file_path('/assets/css/animate.css')), "all");
    wp_enqueue_style("my-css", get_template_directory_uri() . "/style.css", array(), filemtime(get_theme_file_path('style.css')), "all");
    wp_enqueue_script("swiper-cdn-js", "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js", array(), "11.1.1", true);
    wp_enqueue_script("slider-js", get_template_directory_uri() . "/assets/js/slider.min.js", array("jquery"), filemtime(get_theme_file_path('/assets/js/slider.min.js')), true);
    wp_enqueue_script("dialog", get_template_directory_uri() . "/assets/js/dialog.min.js", array("jquery"), filemtime(get_theme_file_path('/assets/js/dialog.min.js')), true);
    wp_enqueue_script("contact-js", get_template_directory_uri() . "/assets/js/contact-html.min.js", array("jquery"), filemtime(get_theme_file_path('/assets/js/contact-html.min.js')), true);
    wp_enqueue_script("wow-js", get_template_directory_uri() . "/assets/js/wow.min.js", array(), filemtime(get_theme_file_path('/assets/js/wow.min.js')), true);
    wp_enqueue_script("my-js", get_template_directory_uri() . "/assets/js/script.min.js", array("jquery"), filemtime(get_theme_file_path('/assets/js/script.min.js')), true);
}
add_action("wp_enqueue_scripts", "my_script_init");

// 対象の記事のカテゴリーを表示する、aタグかどうかは引数で指定できる
function my_the_post_category($anchor = true) {
    $category = get_the_category();
    if ($category[0]) {
        if ($anchor) {
            echo '<a href="' . esc_url(get_category_link($category[0]->term_id)) . '">' . esc_html($category[0]->cat_name) . '</a>';
        } else {
            echo esc_html($category[0]->cat_name);
        }
    }
}

// 対象の記事のサムネイルを表示する
function my_the_post_thumbnail(){
    if (has_post_thumbnail()){
        the_post_thumbnail();
    }
    else{
        echo '<img src="' . get_template_directory_uri() . '/img/archive_top.webp" alt="画像なし">';
    } 
}

function add_is_new(){
    // 投稿日
    $post_date = get_the_date('Y-m-d');
    // 今日から3日前
    $three_days_ago = date('Y-m-d', strtotime('-2 days'));
    // 投稿の日付が今日から3日前以内の場合
    if ($post_date >= $three_days_ago)
        if(is_front_page())
                echo '<div class="blog__item-tag">NEW</div>';
        else
                echo '<div class="staff-blog__blog-label">NEW</div>';
}


// 前の記事・次の記事リンクは、専用関数で作成できるけどクラス名をつけれないので、フィルターフックを使ってクラス名を追加する
function add_class_to_previous_post_link($output) {
    $class = 'blog-post__blog-pagenation--prev'; // 追加したいクラス名
    $output = str_replace('<a href=', '<a class="' . $class . '" href=', $output);
    return $output;
}
add_filter('previous_post_link', 'add_class_to_previous_post_link');

function add_class_to_next_post_link($output) {
    $class = 'blog-post__blog-pagenation--next'; // 追加したいクラス名
    $output = str_replace('<a href=', '<a class="' . $class . '" href=', $output);
    return $output;
}
add_filter('next_post_link', 'add_class_to_next_post_link');

// Contact Form 7で自動挿入されるPタグ、brタグを削除
add_filter('wpcf7_autop_or_not', 'wpcf7_autop_return_false');
function wpcf7_autop_return_false() {
  return false;
} 

// Contact Form7の送信ボタンをクリックした後の遷移先設定
add_action( 'wp_footer', 'add_origin_thanks_page' );
 function add_origin_thanks_page() {
    if ( is_page( array( 'contact', 'reservation' ) ) ) {
    
        $contact = home_url('/contact-thanks/');
        $reservation = home_url('/reservation-thanks/');
        echo <<< EOC
            <script>
            var thanksPage = {
                5f616df: '{$contact}',
                b80c11d: '{$reservation}',
            };
            document.addEventListener( 'wpcf7mailsent', function( event ) {
            location = thanksPage[event.detail.contactFormId];
            }, false );
            </script>
        EOC;
    return;
    } 
}
