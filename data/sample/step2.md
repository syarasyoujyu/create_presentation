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
    <div class="agenda-item">1. はじめに：ANNと画像認識の課題</div>
    <div class="agenda-item">2. CNNの基本アーキテクチャ</div>
    <div class="agenda-item">3. 主要な層①：畳み込み層</div>
    <div class="agenda-item">4. 主要な層②：プーリング層と全結合層</div>
    <div class="agenda-item">5. CNNの設計レシピと学習の可視化</div>
    <div class="agenda-item">6. まとめ</div>
  </div>
</div>

---

<!-- class: content-gray show-page -->

## 1. はじめに：ANNと画像認識の課題
近年、人工ニューラルネットワーク(ANN)は機械学習分野で大きな成功を収めています

<div class="two-col">
  <div class="col">
    <p>
      <span class="bold">従来のANN (全結合型)</span>
    </p>
    <ul>
      <li>ニューロンが前の層の<span class="red-text">すべてのニューロン</span>と結合</li>
      <li>汎用性が高いが、入力データの構造を考慮しない</li>
    </ul>
    <br>
    <p>
      <span class="bold red-text">画像データへの適用における課題</span>
    </p>
    <ul>
      <li>高解像度の画像では、パラメータ数が爆発的に増加</li>
      <li>膨大な計算コストと<span class="bold">過学習(Overfitting)</span>のリスク増大</li>
    </ul>
  </div>
  <div class="col">
    [図: Figure 1. 全結合型ニューラルネットワーク(FNN)の基本構造]
    <p class="text-center">
    入力層の各ノードが、隠れ層の全ノードに接続している
    </p>
  </div>
</div>

---

<!-- class: content-gray show-page -->

## 課題：パラメータ数の爆発的な増加
画像の次元が少し大きくなるだけで、パラメータ数は現実的でないほど増大します

<span class="bold">例：最初の隠れ層の1つのニューロンが持つ重み(パラメータ)数</span>

<div class="two-col">
  <div class="col">
    <p class="text-center">
      <span class="bold">MNISTデータセット (28×28, 白黒)</span>
    </p>
    <p class="text-center">
      28 × 28 × 1 = <span class="bold blue-text" style="font-size: 1.5em;">784</span>
    </p>
    <p class="text-center">
      (多くのANNで管理可能)
    </p>
  </div>
  <div class="col">
    <p class="text-center">
      <span class="bold">少し大きめのカラー画像 (64×64, RGB)</span>
    </p>
    <p class="text-center">
      64 × 64 × 3 = <span class="bold red-text" style="font-size: 1.5em;">12,288</span>
    </p>
    <p class="text-center">
      (ネットワーク全体では膨大な数に)
    </p>
  </div>
</div>

<br>

<p class="bold">
→ この問題を解決するために、画像に特化したアーキテクチャである<span class="blue-text">畳み込みニューラルネットワーク(CNN)</span>が登場しました。
</p>

---

<!-- class: content-gray show-page -->

## 2. CNNの基本アーキテクチャ
CNNは、入力が画像であることを前提とし、その特性を活かした構造を持ちます

[図: Figure 2. MNIST分類のためのシンプルなCNNアーキテクチャ]

CNNは主に3種類の層を積み重ねて構成されます。
1.  **畳み込み層 (Convolutional Layer):** 画像から局所的な特徴を抽出
2.  **プーリング層 (Pooling Layer):** 特徴マップの次元を削減
3.  **全結合層 (Fully-connected Layer):** 抽出された特徴を元に分類

<br>
<p class="bold">
最大の特徴は、<span class="blue-text">入力画像の3次元構造（幅, 高さ, 深さ）</span>を保ったまま処理を進める点です。
</p>

---

<!-- class: content-gray show-page -->

## 3. 主要な層①：畳み込み層 (Convolutional Layer)
CNNの中核を担う層で、学習可能なフィルタを用いて画像の特徴を抽出します

<div class="two-col">
  <div class="col">
    <p><span class="bold">役割:</span></p>
    <ul>
      <li>画像のエッジ、コーナー、テクスチャなどの<span class="red-text">局所的な特徴</span>を検出</li>
    </ul>
    <br>
    <p><span class="bold">重要な工夫:</span></p>
    <ul>
      <li><span class="bold blue-text">局所的結合:</span><br>ニューロンを前の層の小さな領域にのみ接続</li>
      <li><span class="bold blue-text">パラメータ共有:</span><br>同じフィルタ(カーネル)を画像全体で使い回す</li>
    </ul>
    <p>→ これにより、パラメータ数を劇的に削減し、過学習を抑制</p>
  </div>
  <div class="col">
    [図: Figure 4. 畳み込み演算の図解]
    <p class="text-center">
    カーネルが入力上を移動しながら、内積を計算し、出力(特徴マップ)を生成する
    </p>
  </div>
</div>

---

<!-- class: content-gray show-page -->

## 畳み込み層の出力サイズを制御する要素
ハイパーパラメータの設定により、出力される特徴マップの次元を調整します

- **Depth (深さ):**
  - 使用するフィルタの数。出力される特徴マップの数に等しい。
  - どのような特徴を抽出したいかに応じて設定する。

- **Stride (ストライド):**
  - フィルタを移動させる歩幅。
  - ストライドを大きくすると、出力サイズは小さくなる。

- **Zero-padding (ゼロパディング):**
  - 入力画像の周囲を0で埋める処理。
  - 出力サイズの縮小を防いだり、画像の端の特徴を捉えやすくする。

> 出力サイズの計算式:
>
> 入力ボリュームサイズを $V$, 受容野(フィルタ)サイズを $R$, ゼロパディング量を $Z$, ストライドを $S$ とすると、出力サイズは以下で計算できます。
> $$
> \frac{(V - R + 2Z)}{S} + 1
> $$

---

<!-- class: content-gray show-page -->

## 4. 主要な層②：プーリング層と全結合層
畳み込み層で抽出した特徴を圧縮し、最終的な分類を行います

<div class="two-col">
  <div class="col">
    <p class="bold blue-text">プーリング層 (Pooling Layer)</p>
    <ul>
      <li><span class="bold">役割:</span> 特徴マップの次元削減 (ダウンサンプリング)</li>
      <li><span class="bold">効果:</span>
        <ul>
          <li>計算量の削減</li>
          <li>特徴の微小な位置ずれに対する頑健性 (位置不変性) の獲得</li>
        </ul>
      </li>
      <li><span class="bold">代表例:</span> Max-pooling
        <ul>
          <li>領域内の最大値を取る。</li>
          <li>通常、2x2のフィルタをストライド2で適用し、サイズを1/4にする。</li>
        </ul>
      </li>
    </ul>
  </div>
  <div class="col">
    <p class="bold blue-text">全結合層 (Fully-connected Layer)</p>
    <ul>
      <li><span class="bold">役割:</span> 最終的な分類スコアの出力</li>
      <li><span class="bold">構造:</span>
        <ul>
          <li>従来のANNと同じく、すべてのニューロンが結合</li>
          <li>畳み込み/プーリング層で抽出された特徴をすべて統合し、クラス分類などを行う</li>
        </ul>
      </li>
    </ul>
  </div>
</div>

---

<!-- class: content-gray show-page -->

## 5. CNNの設計レシピ
一般的に、畳み込み層とプーリング層を交互に重ねる構成が基本となります

<span class="bold">基本的な設計パターン</span>
- 入力層に近い部分でエッジなどの単純な特徴を学習
- 層が深くなるにつれて、より複雑で抽象的な特徴を学習

[図: Figure 5. 複数の畳み込み層を重ねた、より一般的なCNNアーキテクチャ]

<span class="bold">設計のヒント</span>
- **小さなフィルタを深く重ねる:** 3x3のような小さなフィルタを複数重ねることで、パラメータ数を抑えつつ、より表現力の高い特徴を学習できる。
- **[CONV -> ReLU] -> POOL の繰り返し:** 畳み込みと活性化関数(ReLU)をセットにし、プーリングで次元を削減するブロックを繰り返すのが一般的。

---

<!-- class: content-gray show-page -->

## CNNは何を学習しているのか？ (学習の可視化)
最初の畳み込み層が学習したフィルタを可視化することで、CNNの挙動を理解できます

[図: Figure 3. MNISTで学習したCNNの最初の畳み込み層のアクティベーション]

<br>

<div class="dashed-box">
  <div class="text-center">
    <p>
    この図は、ネットワークが数字の<span class="bold red-text">エッジやストローク、特定の曲線</span>といった、<br>
    画像の基本的な視覚的特徴を<span class="bold blue-text">自動で学習</span>していることを示しています。
    </p>
  </div>
</div>

---

<!-- class: content-gray show-page -->

## 6. まとめ
本論文は、CNNの基本的な概念とアーキテクチャを解説しました

1.  **効率的なアーキテクチャ**
    - CNNは画像の<span class="bold blue-text">空間的局所性</span>を利用し、「局所的結合」と「パラメータ共有」によってパラメータ数を大幅に削減します。

2.  **階層的な特徴抽出**
    - <span class="bold blue-text">畳み込み層</span>・<span class="bold blue-text">プーリング層</span>・<span class="bold blue-text">全結合層</span>を組み合わせることで、画像から単純な特徴（エッジ）から複雑な特徴（オブジェクト）までを階層的に抽出・分類します。

3.  **画像認識の強力な基盤**
    - シンプルな構造でありながら高い性能を発揮し、現代の画像認識タスクにおいて不可欠な基本モデルとなっています。