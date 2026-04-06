---
marp: true
theme: default
size: 16:9
math: katex
highlight: github
paginate: true
---

<style>
/* ============ Variables ============ */
:root {
  --kaira-blue: #0b4b78;
  --kaira-blue-dark: #083a5e;
  --kaira-blue-text: #0b4b78;
  --kaira-gray: #a8a8a8;
  --kaira-gray-bg: #c9c9c9;
  --kaira-white: #ffffff;
  --kaira-logo-url: url("./templates/KaiRA_logo_blue_trans.png");
  --kaira-logo-scale: 3;
  --kaira-content-logo-reserve: calc(150px * var(--kaira-logo-scale));
  --kaira-content-logo-box: calc(40px * var(--kaira-logo-scale));
  --kaira-red: #c9342f;
}

/* ============ Base Layout ============ */
section {
  font-family: "Noto Sans JP", "Hiragino Kaku Gothic ProN", "Yu Gothic", "Meiryo", sans-serif;
  color: #111111;
  background: var(--kaira-white);
  padding: 48px 80px;
  box-sizing: border-box;
}

/* ============ Title Slide ============ */
/* title: layout */
section.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  padding-top: calc(60px * var(--kaira-logo-scale));
}

/* title: logo */
section.title .logo {
  position: absolute;
  top: -20px;
  width: calc(300px * var(--kaira-logo-scale));
  height: calc(90px * var(--kaira-logo-scale));
  margin: 0;
  background-image: var(--kaira-logo-url);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

/* title: subtitle */
section.title .subtitle {
  width: 90%;
  border: 0;
  text-align: center;
  font-size: 26px;
  color: var(--kaira-blue-text);
  padding: 12px 16px;
  margin-top: 0px;
  margin-bottom: 0px;
}

/* title: main title */
section.title .maintitle {
  width: 90%;
  border: 0;
  text-align: center;
  font-size: 50px;
  font-weight: 800;
  color: var(--kaira-blue-text);
  padding: 14px 16px;
}

/* title: bottom blue band */
section.title .bottom-band {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 45%;
  background: var(--kaira-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 80px 28px;
  box-sizing: border-box;
}

/* title: name line */
section.title .name-box {
  width: 90%;
  border: 0;
  color: var(--kaira-white);
  text-align: center;
  padding: 12px 16px;
  font-size: 24px;
  font-weight: 700;
  white-space: nowrap;
  overflow: visible;
  text-overflow: clip;
}

/* title: second name line */
section.title .name-box + .name-box {
  font-size: 30px;
}

/* ============ Agenda Slide ============ */
/* agenda: section */
section.agenda {
  padding: 24px 60px 48px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* agenda: header (left) */
section.agenda .header {
  position: absolute;
  left: 22px;
  top: 16px;
  display: flex;
  align-items: center;
  gap: 14px;
}

/* agenda: title text */
section.agenda .title-block {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 34px;
  font-weight: 800;
  color: #111111;
}

/* agenda: title mark */
section.agenda .title-block .mark {
  width: 16px;
  height: 32px;
  background: var(--kaira-blue);
  transform: translateY(2px);
}

/* agenda: logo (right) */
section.agenda .logo-right {
  position: absolute;
  right: 20px;
  top: -23px;
  width: calc(160px * var(--kaira-logo-scale));
  height: calc(44px * var(--kaira-logo-scale));
  background-image: var(--kaira-logo-url);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: right top;
}

/* agenda: center box */
section.agenda .dashed-box {
  border: 0;
  width: 70%;
  max-width: 900px;
  min-height: 360px;
  margin: 0 auto;
  padding: 28px 24px;
  color: var(--kaira-blue-text);
  font-size: 32px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

section.agenda .agenda-list {
  width: 100%;
  max-width: 720px;
}

/* agenda: item row */
section.agenda .agenda-item {
  display: flex;
  align-items: center;
  gap: 18px;
}

/* agenda: item square */
section.agenda .agenda-item::before {
  content: "";
  width: 18px;
  height: 18px;
  background: var(--kaira-blue);
  flex: 0 0 auto;
  transform: translateY(2px);
}

/* ============ Gray Content Slide (Markdown-only) ============ */
/* gray: section */
section.content-gray {
  --card-outer-pad: 24px;
  --card-pad-top: 18px;
  --card-pad-x: 32px;
  --card-pad-bottom: 32px;
  --card-radius: 20px;
  --card-width: 1232px;
  --card-height: 672px;
  --logo-top-offset: -38px;
  background-color: var(--kaira-gray-bg);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  background-image:
    var(--kaira-logo-url),
    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1232' height='672' viewBox='0 0 1232 672'><rect x='0' y='0' width='1232' height='672' rx='20' ry='20' fill='%23ffffff'/></svg>");
  background-repeat: no-repeat, no-repeat;
  background-size:
    var(--kaira-content-logo-box) var(--kaira-content-logo-box),
    var(--card-width) var(--card-height);
  background-position:
    right calc(var(--card-outer-pad) + var(--card-pad-x)) top calc(var(--card-outer-pad) + var(--card-pad-top) + var(--logo-top-offset)),
    var(--card-outer-pad) var(--card-outer-pad);
  position: relative;
  box-sizing: border-box;
  padding:
    calc(var(--card-outer-pad) + var(--card-pad-top))
    calc(var(--card-outer-pad) + var(--card-pad-x))
    calc(var(--card-outer-pad) + var(--card-pad-bottom))
    calc(var(--card-outer-pad) + var(--card-pad-x));
}

/* gray: heading */
section.content-gray h2 {
  position: relative;
  margin: 0 0 12px 0;
  padding-left: 40px;
  padding-right: calc(var(--kaira-content-logo-reserve) + 16px);
  font-size: 26px;
  font-weight: 700;
  color: #111111;
}

section.content-gray h2::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  width: 28px;
  height: 6px;
  background: var(--kaira-blue);
  border-radius: 2px;
  transform: translateY(-50%);
}

section.content-gray p {
  margin: 0 0 10px 0;
}

section.content-gray pre {
  margin: 8px 0 0 0;
  display: block;
  width: 100%;
  max-width: 100%;
  align-self: flex-start;
  box-sizing: border-box;
  overflow-x: visible;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  min-width: 0;
  max-width: 100%;
  font-size: 18px;
  line-height: 1.4;
  background: #f5f7fa;
  border: 1px solid #d7dde5;
  border-radius: 8px;
  padding: 16px 18px;
}

/* ============ Utilities (Content Page) ============ */
/* util: two-column layout */
.two-col {
  display: flex;
  gap: 28px;
}

.two-col > .col {
  flex: 1 1 0;
}

/* util: top-half two columns, bottom single column */
.two-top-one-bottom {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr auto;
  gap: 20px 28px;
}

.two-top-one-bottom .top-left {
  grid-column: 1;
  grid-row: 1;
}

.two-top-one-bottom .top-right {
  grid-column: 2;
  grid-row: 1;
}

.two-top-one-bottom .bottom {
  grid-column: 1 / span 2;
  grid-row: 2;
}

/* util: red text (for emphasis) */
.red-text {
  color: var(--kaira-red);
}

/* util: dark blue text (for emphasis) */
.blue-text {
  color: var(--kaira-blue-dark);
}

/* util: bold text */
.bold {
  font-weight: 700;
}

/* util: image block */
.image-sample {
  width: 240px;
  height: 70px;
  background-image: var(--kaira-logo-url);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

/* util: code block */
pre code {
  font-family: "Consolas", "Menlo", "Monaco", monospace;
  font-size: inherit;
  line-height: inherit;
  color: #1b1b1b;
  display: inline-block;
  width: auto;
  background: transparent;
  padding: 0;
  border: 0;
}

/* util: text align */
.text-center {
  display: block;
  text-align: center;
}

.text-right {
  display: block;
  text-align: right;
}

/* util: underline */
.underline {
  display: block;
  text-decoration: underline;
  text-decoration-thickness: 3px;
  text-underline-offset: 6px;
}

/* ============ Pagination ============ */
section::after {
  content: attr(data-marpit-pagination);
  position: absolute;
  right: 8px;
  bottom: 0px;
  font-size: 32px;
  color: #111111;
}
</style>

<!-- タイトルスライド -->
<!-- class: title -->

<div class="logo"></div>
<div class="subtitle">イベント名 20OO/OO/OO(日付を入力)</div>
<div class="maintitle">タイトル名</div>

<div class="bottom-band">
  <div style="width: 100%;">
    <div class="name-box">所属(例:京都大学 工学部 情報学科 数理工学コース B4)</div>
    <div class="name-box">名前(例:知能 太郎)</div>
  </div>
</div>

---

<!-- アジェンダスライド -->
<!-- class: agenda show-page -->

<div class="header">
  <div class="title-block"><span class="mark"></span><span>アジェンダ</span></div>
</div>
<div class="logo-right"></div>

<div class="dashed-box">
  <div class="agenda-list">
    <div class="agenda-item">目次1</div>
  </div>
</div>

---

<!-- # コンテンツスライド（グレー背景） -->
<!-- class: content-gray show-page -->

## 見出しを入力
このスライドで伝えたい内容を1行で説明

---

<!-- サンプル: 画像表示 -->
<!-- class: content-gray show-page -->

## 画像サンプル
<div class="image-sample" aria-label="KaiRA ロゴ例"></div>

---

<!-- サンプル: Pythonコード（ハイライト） -->
<!-- class: content-gray show-page -->

## Pythonコードサンプル
```python
def greet(name):
    return f"Hello, {name}!"

print(greet("KaiRA"))
```

---

<!-- サンプル: 文字装飾まとめ -->
<!-- class: content-gray show-page -->

## 文字装飾サンプル
<span class="red-text">赤文字の強調テキスト</span>

<span class="blue-text">濃い青文字の強調テキスト</span>

<span class="bold">太字の強調テキスト</span>

<span class="bold red-text">太字 + 赤文字</span>

<span class="bold blue-text">太字 + 濃い青文字</span>

<span class="text-center">中央揃えテキスト</span>

<span class="text-right">右揃えテキスト</span>

<span class="underline">下線付きテキスト</span>

<br>

空行は`<br>`を使えば入れる事ができます。

---

<!-- サンプル: 数式サンプル -->
<!-- class: content-gray show-page -->

## 数式サンプル
1行数式:
$$
E = mc^2
$$

文章中の数式: 運動方程式は $F = ma$ で表せる

<br>

**補足**
HTMLブロック内に数式を書くと数式表示が効かないことがあります。  
HTML内にMarkdown（数式や箇条書き）を書く場合は、**HTMLタグ間に空行を入れる**と反映されやすいです。  
HTML内に数式を含む場合は可能であれば `<!-- class: content-gray show-page -->` のように **class 指定でHTMLブロックを切り替える方**が安全です。
(2段組みのようにclass指定では実現できないものもあります。)

---

<!-- サンプル: 2段組み -->
<!-- class: content-gray show-page -->

## 2段組みサンプル
<div class="two-col">
  <div class="col">
    <p>左カラムの内容</p>
    <ul>
      <li>ポイントA</li>
      <li>ポイントB</li>
    </ul>
  </div>
  <div class="col">
    <p>右カラムの内容</p>
    <ul>
      <li>ポイントC</li>
      <li>ポイントD</li>
    </ul>
  </div>
</div>

---

<!-- サンプル: 上2段組み + 下1段組み -->
<!-- class: content-gray show-page -->

## 上2段 + 下1段のサンプル
<div class="two-top-one-bottom">
  <div class="top-left">
    <p>左上カラム</p>
    <ul>
      <li>ポイント1</li>
      <li>ポイント2</li>
    </ul>
  </div>
  <div class="top-right">
    <p>右上カラム</p>
    <ul>
      <li>ポイント3</li>
      <li>ポイント4</li>
    </ul>
  </div>
  <div class="bottom">
    <p>下段の横長エリア（1段組み）</p>
    <span class="bold">補足</span>
    <p>  
    HTMLコードをいちいち毎回すべて入力するのが大変なので、コードスニペット機能を活用するとよいと思います。
    </p>
    <p>
    VSCodeのコードスニペットはこのテンプレートに含まれています。
    </p>
  </div>
</div>

---

<!-- サンプル: Marp CLIコマンド -->
<!-- class: content-gray show-page -->

## Marp CLIコマンド
PPTX（編集可能）:
```bash
npx @marp-team/marp-cli ./slide.md --pptx --pptx-editable --allow-local-files -o ./slide.pptx
```
ただし、LibreOfficeのインストールが必要です。
実験的機能なので数式の表示がおかしくなったりすることがあります。
PPTXファイルに変換するとしても編集不可のPPTXファイルへの変換の方が安定しやすいです。

PDF:
```bash
npx @marp-team/marp-cli ./slide.md --pdf --allow-local-files -o ./slide.pdf
```

