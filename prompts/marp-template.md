---
marp: true
theme: kaira
size: 16:9
math: katex
highlight: github
paginate: true
style: ../themes/kaira.css
---

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
