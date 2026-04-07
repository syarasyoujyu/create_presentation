---
marp: true
theme: kaira
size: 16:9
math: katex
highlight: github
paginate: true
---

<!-- class: title -->

<div class="logo"></div>
<div class="subtitle">論文紹介 2026/04/07</div>
<div class="maintitle">畳み込みニューラルネットワーク入門</div>

<div class="bottom-band">
  <div style="width: 100%;">
    <div class="name-box">理学部　化学科</div>
    <div class="name-box">知能　太郎</div>
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
    <div class="agenda-item">1. はじめに：なぜCNNなのか？</div>
    <div class="agenda-item">2. CNNの全体像</div>
    <div class="agenda-item">3. CNNの主要な構成要素</div>
    <div class="agenda-item">4. CNN構築の基本レシピ</div>
    <div class="agenda-item">5. まとめ</div>
  </div>
</div>

---

<!-- class: content-gray show-page -->

## 1. はじめに：なぜCNNなのか？
従来のニューラルネットワーク(ANN)には画像認識における課題がありました

<div class="two-col">
  <div class="col">
    <p><span class="bold blue-text">従来のANN (全結合型) の課題</span></p>
    <ul>
      <li>画像を入力として扱うと、パラメータ数が爆発的に増加する</li>
      <li><span class="bold">例: 64x64ピクセルのカラー画像</span>
        <ul>
          <li>入力次元: 64 x 64 x 3 = 12,288</li>
          <li>最初の隠れ層のニューロン1つだけで <span class="red-text bold">1万以上の重み</span>が必要</li>
        </ul>
      </li>
      <li>パラメータが多すぎると、計算コストが増大し、<span class="red-text bold">過学習 (Overfitting)</span> のリスクが高まる</li>
    </ul>
  </div>
  <div class="col">
    <p><span class="bold blue-text">CNNによる解決策</span></p>
    <ul>
      <li>CNN (畳み込みニューラルネットワーク) は、画像の特性を活かした特殊なアーキテクチャを持つ</li>
      <li><span class="bold">局所的な結合</span>と<span class="bold">パラメータ共有</span>という仕組みにより、パラメータ数を劇的に削減</li>
      <li>これにより、効率的な学習と高い汎化性能を実現</li>
    </ul>
  </div>
</div>

<br>
<p class="text-center">
<span class="bold">CNNは、画像認識タスクに特化することで従来のANNの限界を克服します</span>
</p>

---

<!-- class: content-gray show-page -->

## 2. CNNの全体像
入力画像から特徴を抽出し、分類するまでの一連の流れ

CNNは主に<span class="bold blue-text">3種類の層</span>を積み重ねて構成されます。

- **入力層 (Input)**: 画像のピクセル値を保持
- **畳み込み層 (Convolutional Layer)**: 画像から局所的な特徴を抽出
- **プーリング層 (Pooling Layer)**: 特徴マップの次元を削減
- **全結合層 (Fully-connected Layer)**: 抽出された特徴を基に最終的な分類

<br>
<div class="text-center">
[図: シンプルなCNNアーキテクチャ (論文 Fig. 2)]
</div>

---

<!-- class: content-gray show-page -->

## 3. CNNの主要な構成要素 (1) 畳み込み層
CNNの核となる、画像から特徴を抽出するための層

<div class="two-col">
  <div class="col">
    <p><span class="bold">役割</span></p>
    <ul>
      <li><span class="bold blue-text">学習可能なカーネル（フィルタ）</span>を使い、画像から局所的な特徴（エッジ、コーナー、テクスチャ等）を検出する</li>
    </ul>
    <br>
    <p><span class="bold">仕組み</span></p>
    <ul>
      <li>カーネルを入力画像上でスライドさせながら、各位置で内積計算（<span class="bold blue-text">畳み込み演算</span>）を行う</li>
      <li>これにより、特徴の存在箇所をマッピングした<span class="bold">活性化マップ</span>を生成する</li>
    </ul>
  </div>
  <div class="col text-center">

![w:640](./step3-assets/figure-02.png)

Fig. 3: Activations taken from the first convolutional layer of a simplistic deep
  </div>
</div>
<br>
<p>
畳み込み層は<span class="bold red-text">「パラメータ共有」</span>（同じカーネルを使い回す）と<span class="bold red-text">「局所的結合」</span>により、少ないパラメータで効率的に特徴を抽出します。
</p>

---

<!-- class: content-gray show-page -->

## 3. CNNの主要な構成要素 (1) 畳み込み層のパラメータ
畳み込み層の挙動を制御する3つの主要なハイパーパラメータ

- **Depth (深さ)**
  - 出力する活性化マップの数（= 使用するカーネルの数）。
  - 様々な種類の特徴を同時に抽出するために設定します。

- **Stride (ストライド)**
  - カーネルをスライドさせる際の移動幅。
  - ストライドを大きくすると、出力される活性化マップのサイズは小さくなります。

- **Zero-padding (ゼロパディング)**
  - 入力画像の周囲を0で埋める処理。
  - これにより、画像の端の特徴を捉えやすくなり、出力サイズの調整も可能になります。

> **出力サイズの計算式**
>
> 入力サイズを $W$、カーネルサイズを $F$、パディングを $P$、ストライドを $S$ とすると、出力サイズは以下で計算できます。
> $$
> \text{Output Size} = \frac{(W - F + 2P)}{S} + 1
> $$

---

<!-- class: content-gray show-page -->

## 3. CNNの主要な構成要素 (2) プーリング層
特徴マップの次元を削減し、計算負荷を軽減する層

<div class="two-col">
  <div class="col">
    <p><span class="bold">役割</span></p>
    <ul>
      <li>特徴マップの空間的な次元（幅と高さ）を削減（<span class="bold blue-text">ダウンサンプリング</span>）する</li>
    </ul>
    <br>
    <p><span class="bold">目的</span></p>
    <ul>
      <li>ネットワーク全体のパラメータ数と計算量を削減する</li>
      <li>特徴の微小な位置ずれに対してモデルを頑健にする（<span class="bold blue-text">位置不変性</span>の獲得）</li>
    </ul>
  </div>
  <div class="col">
    <p><span class="bold">代表的な手法：Max-pooling</span></p>
    <ul>
      <li>特徴マップを小さな領域に分割し、各領域の<span class="red-text bold">最大値</span>のみを取り出す</li>
      <li>一般的に、2x2のサイズ、ストライド2で適用され、特徴マップのサイズは縦横半分（面積1/4）になる</li>
    </ul>
  </div>
</div>
<br>
<p class="text-center">
プーリング層は、特徴マップの最も重要な情報（活性の強い部分）を保持しながら、情報を圧縮します。
</p>

---

<!-- class: content-gray show-page -->

## 3. CNNの主要な構成要素 (3) 全結合層
抽出された特徴を統合し、最終的な分類を行う層

<div class="two-col">
  <div class="col">
    <p><span class="bold">役割</span></p>
    <ul>
      <li>畳み込み層とプーリング層で抽出された高レベルな特徴をすべて受け取り、最終的な出力（例：クラスごとの確率）を計算する</li>
    </ul>
    <br>
    <p><span class="bold">構造</span></p>
    <ul>
      <li>従来のニューラルネットワーク(ANN)と同様の構造</li>
      <li>前の層のすべてのニューロンと、現在の層のすべてのニューロンが結合（全結合）している</li>
    </ul>
  </div>
  <div class="col">
    [図: 従来のニューラルネットワーク構造 (論文 Fig. 1)]
    <p class="text-center">CNNの最終段は、この全結合構造になっていることが多い</p>
  </div>
</div>

---

<!-- class: content-gray show-page -->

## CNNは何を学習しているのか？
MNISTデータセットで学習したCNNの最初の層が捉えた特徴の可視化

<div class="text-center">

![w:640](./step3-assets/figure-04.png)

Fig. 3: Activations taken from the first convolutional layer of a simplistic deep

</div>

- <span class="bold">CNNは、データから自動で特徴抽出器を学習します。</span>
  - <span class="bold blue-text">浅い層</span>（入力に近い層）では、エッジや特定の向きの線、色の塊といった<span class="bold">単純で基本的な特徴</span>を検出するフィルタが学習されます。
  - <span class="bold blue-text">深い層</span>では、浅い層で学習した特徴を組み合わせ、より<span class="bold">複雑で抽象的な特徴</span>（例：「目」や「鼻」、「数字の丸い部分」など）を捉えるようになります。

---

<!-- class: content-gray show-page -->

## 4. CNN構築の基本レシピ
効果的なCNNアーキテクチャを設計するための経験的な指針

- <span class="bold">基本パターン</span>
  - `(CONV -> ReLU) * N -> POOL` というブロックを複数回繰り返すのが一般的。
  - 畳み込み層を複数重ねてからプーリングすることで、より複雑な特徴を捉えられます。

- <span class="bold">推奨される設計</span>
  - <span class="bold blue-text">小さなフィルタを深く重ねる:</span> 5x5や7x7の大きなフィルタを1層使うより、3x3の小さなフィルタを2層、3層と重ねる方が、パラメータ数を抑えつつ高い表現力を得られることが多いです。
  - <span class="bold blue-text">入力画像のサイズ:</span> 2で繰り返し割り切れるサイズ（例: 32, 64, 96, 224）が望ましいです。
  - <span class="bold blue-text">畳み込み層の設定:</span> ストライドは1、パディングを用いて入力と出力のサイズを維持するのが一般的です。

<div class="text-center">

![w:640](./step3-assets/figure-05.png)

Fig. 3: Activations taken from the first convolutional layer of a simplistic deep

</div>

---

<!-- class: content-gray show-page -->

## 5. まとめ
本発表の要点

1.  **CNNの強み**
    - 従来のANNが画像認識で抱えていたパラメータ数の問題を、<span class="bold blue-text">局所的結合</span>と<span class="bold blue-text">パラメータ共有</span>という仕組みで解決しました。

2.  **主要な構成要素の役割**
    - <span class="bold blue-text">畳み込み層</span>で特徴を抽出し、<span class="bold blue-text">プーリング層</span>で情報を圧縮・次元削減し、最後に<span class="bold blue-text">全結合層</span>でクラス分類を行います。

3.  **階層的な特徴学習**
    - CNNは層を重ねることで、画像の単純な特徴（エッジ、色）から複雑で抽象的な特徴（物体のパーツ）までを、<span class="bold red-text">データから自動で階層的に学習</span>する強力なモデルです。