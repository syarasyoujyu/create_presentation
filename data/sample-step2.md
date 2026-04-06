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
<!-- class: title -->

<div class="logo"></div>
<div class="subtitle">論文紹介 2026/04/07</div>
<div class="maintitle">機械学習による複合劣化ナンバープレート画像の高精度認識</div>

<div class="bottom-band">
  <div style="width: 100%;">
    <div class="name-box">所属未入力</div>
    <div class="name-box">発表者未入力</div>
  </div>
</div>

---
<!-- class: agenda show-page -->

<div class="header">
  <div class="title-block"><span class="mark"></span><span>アジェンダ</span></div>
</div>
<div class="logo-right"></div>

<div class="dashed-box">
  <div class="agenda-list">
    <div class="agenda-item">1. 研究背景と課題</div>
    <div class="agenda-item">2. 提案手法</div>
    <div class="agenda-item">3. 実験設定</div>
    <div class="agenda-item">4. 結果と考察</div>
    <div class="agenda-item">5. まとめ</div>
  </div>
</div>

---
<!-- class: content-gray show-page -->

## 研究背景
<div class="two-col">
<div class="col">

### 監視カメラの普及と複合劣化画像

*   監視カメラは社会に広く普及し、犯罪捜査等でナンバープレート画像が重要な証拠として利用されている
*   しかし、実際に撮影される画像は、環境光の外乱、低解像度、ノイズなど複数の要因が重なった**「複合劣化画像」**であることが多い
*   こうした悪条件下では、文字が不鮮明になり、従来の認識システムでは精度が著しく低下するという問題がある

<br>

➡️ **「読めない」を「読める」に！** 複合劣化画像からでも高精度に文字を認識できる技術が強く求められている

</div>
<div class="col">

[図: 監視カメラで撮影された、白飛びや低解像度で文字が読みにくいナンバープレート画像の例を入れる]

<span class="text-center">複合劣化画像の例</span>

</div>
</div>

---
<!-- class: content-gray show-page -->

## 解決したい3つの課題
本研究では、複合劣化したナンバープレート画像を正確に認識するために、以下の3つの課題を解決することを目指します。

1.  <span class="bold blue-text">ロバスト性の向上</span>
    *   **課題:** ヘッドライトなどの強い環境光による白飛び
    *   **目標:** 光の影響に頑健な画質改善を実現する

2.  <span class="bold blue-text">効率性の向上</span>
    *   **課題:** 低解像度による文字情報の欠落
    *   **目標:** 少ない情報から効率的に画像を再構成（超解像）する

3.  <span class="bold blue-text">適応性の向上</span>
    *   **課題:** 多様な劣化パターンや、ひらがな等の複雑な文字形状
    *   **目標:** 様々な状況に柔軟に対応できる高性能な文字認識

---
<!-- class: content-gray show-page -->

## 提案手法の全体像
3つの課題を解決するため、それぞれに特化した機械学習手法を提案し、統合します。

<div class="two-top-one-bottom">
<div class="top-left">

#### 1. ロバスト性向上
<span class="bold">SVRを用いたRetinex処理</span>
環境光の外乱を抑制し、安定した画質改善を実現

</div>
<div class="top-right">

#### 2. 効率性向上
<span class="bold">SVMを用いた画素選択型超解像</span>
低解像度画像から文字のエッジなどを鮮明に復元

</div>
<div class="bottom">

#### 3. 適応性向上
<span class="bold">多重構造CNNによる文字認識</span>
多様な劣化パターンに対応し、高精度な文字認識を実現

<br>
<p class="text-center bold blue-text">
これらの手法を統合し、複合劣化画像に対する高精度な認識システムを構築
</p>
</div>
</div>

---
<!-- class: content-gray show-page -->

## 手法①：SVRを用いたRetinex処理によるロバスト性向上
環境光による画像の白飛びや不自然な輪郭（Haloアーティファクト）を抑制します。

*   **Retinex処理:** 画像を「照明成分」と「反射成分」に分離し、照明の影響を除去する画質改善手法
*   **課題:** 従来のRetinex処理では、照明成分の推定が不正確で、特に画像の輪郭周りに<span class="red-text">Haloアーティファクト</span>が発生しやすい
*   **提案:** 照明成分の推定に**サポートベクター回帰 (SVR)** を導入
    *   SVRを用いることで、より滑らかで正確な照明成分の推定が可能に
    *   結果として、Halo作用を効果的に抑制し、環境光に頑健な画質改善を達成

[図: 論文 図2.9を基に、(a)補正前、(b)従来(SSR)、(d)提案(Retinex)の3つの画像を並べて比較する図を入れる]
<p class="text-center">従来法では残っていた画像の縁の不自然な強調が、提案法では抑制されている</p>

---
<!-- class: content-gray show-page -->

## 手法②：SVMを用いた画素選択型超解像による効率性向上
低解像度でぼやけた文字を鮮明に復元します。

*   **マルチフレーム超解像:** 複数枚の少しずつ位置がずれた低解像度画像から、1枚の高解像度画像を生成する技術
*   **課題:** 従来法では、画素が対応しない領域（開口部）の情報が欠損し、エッジがぼやける**「開口問題」**が発生する
*   **提案:** **サポートベクターマシン (SVM)** を用いて、複数の低解像度画像から再構成に最も寄与する<span class="bold blue-text">最適な画素を選択</span>
    *   SVMの識別能力を利用し、情報の欠損を最小限に抑えながら画像を再構成
    *   これにより、文字のエッジなどがより鮮明に復元され、認識しやすい画像に

[図: 論文 図3.10を基に、(a)従来超解像、(b)提案超解像の2画像を並べて比較する図を入れる]
<p class="text-center">提案手法の方が、ぼやけた文字のエッジがくっきりと復元されている</p>

---
<!-- class: content-gray show-page -->

## 手法③：多重構造CNNによる適応性向上
多様な劣化パターンや複雑な文字形状に対応します。

*   **課題:** 従来のCNNは単一の解像度しか扱えないため、画像の劣化度合いによっては最適な性能を発揮できない
*   **提案:** 1つの入力画像から複数の解像度の画像を生成し、それらを並列に処理する**「多重構造CNN」**を構築
    *   低解像度画像: 全体的な形状の把握に有利
    *   高解像度画像: 細部の特徴抽出に有利
    *   これらの階層からの出力を統合することで、画像の劣化状態に応じて最適な情報を活用し、認識精度を向上させる

[図: 論文 図4.5(a)を簡略化した多重構造CNNの模式図を入れる]
<p class="text-center">多重解像度画像を並列処理し、各認識結果を統合</p>

---
<!-- class: content-gray show-page -->

## 実験設定
提案手法の有効性を検証するため、以下の設定で実験を行いました。

*   **データセット**
    *   **実環境画像:** 実際に車両にナンバープレートを設置し、多様な条件下（昼夜、天候、ナンバー灯の有無など）で撮影
    *   **人工劣化画像:** 実写画像に対し、計算機上で解像度低下、ノイズ、JPEG圧縮などを系統的に加え、各劣化要因への耐性を定量的に評価

*   **評価指標**
    *   **文字認識精度:**
        1.  **正答率:** 1番目の候補で正解できる確率
        2.  **平均候補数:** 正解を得るまでに必要な候補の平均数

*   **比較対象**
    *   提案した各手法（SVR-Retinex, SVM超解像, 多重構造CNN）と、それぞれの従来手法
    *   提案した3つの手法を全て統合したシステムの総合性能

---
<!-- class: content-gray show-page -->

## 結果(1)：各提案手法の有効性
各提案手法は、従来手法と比較して文字認識の正答率を大幅に向上させました。

*   <span class="bold">SVR-Retinex (ロバスト性):</span>
    従来Retinex処理と比較し、正答率が<span class="bold red-text">25%以上向上</span>

*   <span class="bold">SVM超解像 (効率性):</span>
    従来超解像処理と比較し、正答率が<span class="bold red-text">32%以上向上</span>

*   <span class="bold">多重構造CNN (適応性):</span>
    *   従来CNNと比較し、正答率が<span class="bold red-text">約1.17倍</span>に向上
    *   第2候補までに正解が含まれる確率は<span class="bold red-text">90%</span>に達し、高い実用性を示した

<br>
<p class="bold blue-text text-center">
各手法がそれぞれの課題に対して有効であることが確認できた
</p>

---
<!-- class: content-gray show-page -->

## 結果(2)：全手法を統合した総合性能
提案手法をすべて統合することで、認識性能が飛躍的に向上しました。

<div class="two-col">
<div class="col">

### 正解を得るのに必要な候補数

[図: 論文 図5.17のグラフを入れる]
<p class="text-center">
<span class="bold blue-text">提案手法（赤）</span>は<span class="bold">従来法（青）</span>よりも常に少ない候補数で正解に到達
</p>

</div>
<div class="col">

### 1候補目での正答率

| 劣化強度 | 従来法 | 提案法 (統合) | 向上率 |
| :--- | :---: | :---: | :---: |
| 弱い (k₂=8) | 86.6% | 87.4% | +0.8% |
| 中程度 (k₂=11) | 52.5% | 66.0% | +13.5% |
| 強い (k₂=13) | 31.3% | 47.9% | <span class="bold red-text">+16.6%</span> |

(表5.8のCTと提案法の値を抜粋)

<br>

*   提案手法全体を統合すると、従来手法の組み合わせと比較して正答率が<span class="bold red-text">最大で約2倍</span>に向上
*   特に<span class="bold">劣化が強い画像</span>ほど、提案手法の優位性が顕著に

</div>
</div>

---
<!-- class: content-gray show-page -->

## 考察：実用上のインパクト
本研究の成果は、犯罪捜査などの実応用において大きな貢献が期待できます。

*   **従来手法の課題:**
    認識精度が低いため、多数の候補車両を目視で確認する必要があり、捜査員に大きな負担がかかっていた。

*   **提案手法による貢献:**
    *   高い認識精度により、正解を少ない候補数で特定可能に。
    *   実験結果から、容疑車両を絞り込む台数を、従来手法を適用した場合の<span class="bold red-text">約2%</span>まで削減できる可能性が示された。
    *   これは、捜査の<span class="bold blue-text">劇的な効率化</span>と<span class="bold blue-text">負担軽減</span>に直結する。

<br>
<p class="text-center bold">
「読めない」画像を「読める」ようにすることで、社会的な課題解決に貢献
</p>

---
<!-- class: content-gray show-page -->

## 今後の課題
本研究のさらなる発展のため、以下の課題が挙げられます。

*   **ナンバープレート領域の抽出性能向上**
    *   本研究では文字認識に焦点を当てたが、画像全体からナンバープレート領域を確実に見つけ出す前処理も、複合劣化環境下では依然として課題。

*   **傾き補正性能の向上**
    *   斜めから撮影された画像の傾き補正精度をさらに高めることで、認識精度全体の向上が期待できる。

*   **動いている車両への対応**
    *   走行中の車両を撮影した際に生じる「モーションブラー」に特化した画質改善手法やネットワーク構造の検討が必要。

---
<!-- class: content-gray show-page -->

## まとめ
本研究の貢献を3点にまとめます。

1.  <span class="bold blue-text">複合劣化画像に対する3つの特化手法を提案</span>
    *   「ロバスト性」「効率性」「適応性」の課題に対し、SVR-Retinex、SVM超解像、多重構造CNNという3つの機械学習手法を開発した。

2.  <span class="bold blue-text">各手法の有効性を実験的に証明</span>
    *   それぞれの提案手法が、従来法と比較して画質改善と認識精度の両面で優位性を持つことを定量的に示した。

3.  <span class="bold blue-text">全手法の統合による飛躍的な性能向上と実用性の提示</span>
    *   全手法を統合することで、従来比で認識精度が<span class="bold red-text">最大約2倍</span>に向上。
    *   犯罪捜査における車両絞り込み台数を<span class="bold red-text">約2%</span>まで削減できる可能性を示し、社会実装への大きな一歩を築いた。