



<!DOCTYPE html>
<html lang="ja">
<!-- head -->
<!-- prettier-ignore -->

<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

	<!-- nodndexの記載 -->
	<meta name="robots" content="noindex" />

	
  <?php wp_head(); ?>
<!-- GoogleFonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;600&amp;family=Oswald:wght@400;500&amp;display=swap" rel="stylesheet" />

</head>

<body>
	<!-- header -->
	<!-- prettier-ignore -->
	<header class="l-header p-header">
		<div class="l-inner">
			<!-- ロゴ、グローバルナビ、ハンバーガーメニュー -->
			<div class="p-header__container">
				<!-- ロゴ -->
				<h1 class="c-logo">
					<a href="<?php echo esc_url(home_url('/')); ?>">Pumi's<br />Portfolio</a>
				</h1>
				<!-- グローバルナビ -->
				<nav class="p-header__nav">
					<div class="p-header__nav--item">
						<a class="p-header__link hover__underline--from-left" href="<?php echo esc_url(home_url('/')); ?>#works" target="_self">works</a>
					</div>
					<div class="p-header__nav--item">
						<a class="p-header__link hover__underline--from-left" href="<?php echo esc_url(home_url('/')); ?>#about" target="_self">about</a>
					</div>
					<div class="p-header__nav--item">
						<a class="p-header__link hover__underline--from-left" href="<?php echo esc_url(home_url('/')); ?>#skills" target="_self">skills</a>
					</div>
					<div class="p-header__nav--item">
						<a class="p-header__link hover__underline--from-left" href="<?php echo esc_url(home_url('/')); ?>#contact" target="_self">contact</a>
					</div>
					<div class="p-header__nav--item">
						<a class="p-header__link hover__underline--from-left" href="https://twitter.com/pumi_webcoder" target="_blank">Twitter(X)</a>
					</div>
				</nav>
				<!-- ハンバーガーメニュー -->
				<div class="p-header__hamburger--button">
					<button id="js-drawer__btn" class="c-hamburger-btn" aria-label="ハンバーガーメニュー">

						<span class="c-hamburger-bar"></span>

						<span class="c-hamburger-bar"></span>

						<span class="c-hamburger-bar"></span>

					</button>
				</div>
			</div>
			<!-- ドロワーメニュー（ヘッダーコンテナの外） -->
			<nav class="p-drawer__nav">
				<div class="p-drawer__nav--item">
					<a class="p-drawer__link" href="<?php echo esc_url(home_url('/')); ?>#works">works</a>
				</div>
				<div class="p-drawer__nav--item">
					<a class="p-drawer__link" href="<?php echo esc_url(home_url('/')); ?>#about">about</a>
				</div>
				<div class="p-drawer__nav--item">
					<a class="p-drawer__link" href="<?php echo esc_url(home_url('/')); ?>#skills">skills</a>
				</div>
				<div class="p-drawer__nav--item">
					<a class="p-drawer__link" href="<?php echo esc_url(home_url('/')); ?>#contact">contact</a>
				</div>
				<div class="p-drawer__nav--item">
					<a class="p-drawer__link" href="https://twitter.com/pumi_webcoder">Twitter(X)</a>
				</div>
			</nav>
		</div>
	</header>

	<main class="main">