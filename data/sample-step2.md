---
marp: true
theme: kaira
size: 16:9
math: katex
highlight: github
paginate: true
---

<!-- タイトルスライド -->
<!-- class: title -->

<div class="logo"></div>
<div class="subtitle">論文紹介 2026/04/07</div>
<div class="maintitle">機械学習による複合劣化ナンバープレート画像の画質改善と文字認識</div>

<div class="bottom-band">
  <div style="width: 100%;">
    <div class="name-box">理学部　化学科</div>
    <div class="name-box">知能　太郎</div>
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
    <div class="agenda-item">1. 研究背景と課題</div>
    <div class="agenda-item">2. 提案手法</div>
    <div class="agenda-item">3. 実験と結果</div>
    <div class="agenda-item">4. 考察</div>
    <div class="agenda-item">5. まとめ</div>
  </div>
</div>

---

<!-- # コンテンツスライド（グレー背景） -->
<!-- class: content-gray show-page -->

## 研究背景
実環境の監視カメラ映像は、ナンバープレート認識を困難にする「複合劣化」を伴う

<div class="two-col">
  <div class="col">
    <p class="bold">監視カメラの重要性</p>
    <ul>
      <li>防犯や犯罪捜査において、監視カメラ映像は重要な役割を担う</li>
      <li>特に車両が関わる事件では、ナンバープレートの自動認識が捜査の鍵となる</li>
    </ul>
    <br>
    <p class="bold">実環境における画質の課題</p>
    <ul>
      <li>実際の映像は、様々な要因が組み合わさった<span class="red-text">「複合劣化」</span>を被っている</li>
      <li>低解像度、照明変動、ノイズ、撮影ブレなど</li>
      <li><span class="bold">従来技術では、複合劣化した画像の高精度な認識は困難</span></li>
    </ul>
  </div>
  <div class="col">
    <p class="bold">複合劣化画像の例 (<span class="ref-inline">論文図5.15</span>より)</p>
    <p class="text-center">[図: 様々な照明や角度で撮影された、不鮮明なナンバープレート画像]</p>
    <p>本研究では、機械学習を用いてこの複合劣化の問題にアプローチします。</p>
  </div>
</div>

---

<!-- class: content-gray show-page -->

## 解決したい3つの課題
複合劣化画像からの高精度な文字認識を実現する

1.  **ロバスト性の欠如**
    - ナンバープレート灯やヘッドライトによる<span class="blue-text">環境光の外乱（白飛びなど）</span>に弱い
    - 従来の画質改善法(Retinex法)では、照明成分の推定精度が限定的

2.  **効率性の低さ**
    - <span class="blue-text">低解像度で文字情報が欠落</span>した画像から、効率的に情報を再構成できない
    - 従来の超解像技術ではアーティファクト（偽の模様）が発生しやすい

3.  **適応性の不足**
    - <span class="blue-text">多様な文字フォントや、様々な種類の複合劣化</span>に対し、柔軟に対応できない
    - 従来のCNNは入力画像の解像度が固定されており、劣化状態に応じた処理が困難

---

<!-- class: content-gray show-page -->

## 提案手法の全体像
3つの課題に対し、それぞれに特化した機械学習手法を提案

<div class="two-top-one-bottom">
  <div class="top-left">
    <p class="bold">課題1: ロバスト性の欠如（環境光）</p>
    <p class="bold blue-text">提案1: SVRを用いたRetinex処理</p>
    <ul>
      <li>サポートベクター回帰(SVR)で照明成分を高精度に推定し、外乱を除去</li>
    </ul>
  </div>
  <div class="top-right">
    <p class="bold">課題2: 効率性の低さ（低解像度）</p>
    <p class="bold blue-text">提案2: SVMを用いた画素値選択型超解像</p>
    <ul>
      <li>サポートベクターマシン(SVM)で最適な画素を選択し、鮮明な画像を再構成</li>
    </ul>
  </div>
  <div class="bottom">
    <p class="bold">課題3: 適応性の不足（多様な劣化）</p>
    <p class="bold blue-text">提案3: 多重構造CNNによる文字認識</p>
    <ul>
      <li>複数の解像度の画像を並列処理し、劣化状態に応じて最適な情報から認識</li>
    </ul>
    <br>
    <p class="text-center bold">これら3つの手法を統合し、複合劣化画像に対する総合的な認識性能の向上を目指す</p>
  </div>
</div>

---

<!-- class: content-gray show-page -->

## 提案手法1: SVRを用いたRetinex処理
サポートベクター回帰(SVR)により、環境光の外乱に頑健な画質改善を実現

<div class="two-col">
  <div class="col">
    <p class="bold">従来手法 (Retinex) の課題</p>
    <ul>
      <li>照明成分の推定精度が低く、白飛びなどを十分に除去できない</li>
      <li>Haloアーティファクト（輪郭の不自然な強調）が発生しやすい</li>
    </ul>
    <br>
    <p class="bold blue-text">提案手法</p>
    <ul>
      <li>機械学習の一種である<span class="bold">SVR</span>を用いて、画像中の照明成分をより高精度に推定</li>
      <li>これにより、Haloを抑制しつつ、環境光の外乱を効果的に除去</li>
    </ul>
  </div>
  <div class="col">
    <p class="bold text-center">画質改善効果の比較 (<span class="ref-inline">論文図2.9</span>より)</p>
    <p class="text-center">[図: (a)補正前, (b)SSR(従来法), (c)2MSR(従来法), (d)提案法 のナンバープレート画像比較。提案法が最も自然で鮮明]</p>
    <p>提案手法(d)は、白飛びが抑制され、文字が最もクリアになっている。</p>
  </div>
</div>

---

<!-- class: content-gray show-page -->

## 提案手法2: SVMを用いた画素値選択型超解像
サポートベクターマシン(SVM)により、低解像度から鮮明な画像を効率的に復元

<div class="two-col">
  <div class="col">
    <p class="bold">従来手法 (超解像) の課題</p>
    <ul>
      <li>複数の低解像度画像を合成する際、情報が欠落している部分にアーティファクト（偽の模様）が発生しやすい</li>
      <li>特に文字の輪郭(エッジ)がぼやけてしまう</li>
    </ul>
    <br>
    <p class="bold blue-text">提案手法</p>
    <ul>
      <li>複数の低解像度フレームの中から、<span class="bold">SVM</span>を用いて「最も確からしい」画素を選択して高解像度画像を再構成</li>
      <li>アーティファクトを抑制し、鮮明なエッジを復元</li>
    </ul>
  </div>
  <div class="col">
    <p class="bold text-center">超解像結果の比較 (<span class="ref-inline">論文図3.10</span>より)</p>
    <p class="text-center">[図: (a)従来超解像, (b)提案超解像 のナンバープレート画像比較。提案法の方が文字の輪郭がシャープ]</p>
    <p>提案手法(b)は、従来手法(a)に比べて文字のエッジが鮮明に復元されている。</p>
  </div>
</div>

---

<!-- class: content-gray show-page -->

## 提案手法3: 多重構造CNNによる文字認識
複数の解像度を並列処理するCNNアーキテクチャにより、多様な劣化に適応

<div class="two-col">
  <div class="col">
    <p class="bold">従来手法 (単一構造CNN) の課題</p>
    <ul>
      <li>入力画像の解像度が固定されているため、劣化の度合いに応じた最適な処理ができない</li>
      <li>劣化が強い画像では認識性能が大幅に低下する</li>
    </ul>
    <br>
    <p class="bold blue-text">提案手法</p>
    <ul>
      <li>入力画像を複数の解像度（イメージピラミッド）に変換</li>
      <li>各解像度を<span class="bold">並列のCNN</span>で処理し、結果を統合</li>
      <li>これにより、劣化状態に最も適した解像度の情報を用いて認識を行い、高い適応性を実現</li>
    </ul>
  </div>
  <div class="col">
    <p class="bold text-center">提案手法のアーキテクチャ (<span class="ref-inline">論文図4.5</span>より)</p>
    <p class="text-center">[図: 多重解像度画像が複数のCNNに並列入力され、その結果が統合される構成図]</p>
  </div>
</div>

---

<!-- class: content-gray show-page -->

## 実験設定
提案手法の有効性を定量的に評価

-   **データセット**
    -   実環境の様々な条件下で撮影したナンバープレート画像
    -   計算機上でシミュレーションによる複合劣化（低解像度化、ノイズ、JPEG圧縮など）を付与
-   **比較対象**
    -   <span class="bold">画質改善**: 従来のRetinex法 (SSR, 2MSR)、従来の超解像法
    -   <span class="bold">文字認識**: 一般的な単一構造のCNN、従来の複数候補選択アルゴリズム
-   **評価指標**
    -   <span class="bold">文字認識正答率**: 文字を正しく認識できた割合
    -   <span class="bold">平均候補数**: 正解を得るまでに必要な候補の平均数（少ないほど実用的）
    -   <span class="bold">視覚的評価**: 改善後の画像の鮮明さやアーティファクトの有無

---

<!-- class: content-gray show-page -->

## 結果1: 各提案手法の有効性
いずれの手法も、従来手法を大幅に上回る性能を達成

<div class="two-top-one-bottom">
  <div class="top-left">
    <p class="bold">SVRを用いたRetinex処理 (ロバスト性)</p>
    <p class="text-center">[図: 論文図2.13のグラフ。提案Retinexが他の手法(SSR, 2MSR)より高い正答率を維持している]</p>
    <p>従来法に対し、文字認識の正答率が<span class="bold red-text">最大32%向上</span></p>
  </div>
  <div class="top-right">
    <p class="bold">SVMを用いた超解像 (効率性)</p>
    <p class="text-center">[図: 論文表5.7の正答率をグラフ化したもの。提案超解像が従来超解像より高い正答率を示している]</p>
    <p>従来法に対し、文字認識の正答率が<span class="bold red-text">最大32%向上</span></p>
  </div>
  <div class="bottom">
    <p class="bold">多重構造CNNによる文字認識 (適応性)</p>
    <p class="text-center">[図: 論文図4.8(a)のグラフ。提案の文字認識法が他の手法(CA, CTなど)より高い正答率を維持している]</p>
    <p>従来法に対し、文字認識の正答率が<span class="bold red-text">最大7.2%向上</span>。特に劣化が強い領域で優位性が顕著。</p>
  </div>
</div>

---

<!-- class: content-gray show-page -->

## 結果2: 全手法の統合による効果
認識性能が飛躍的に向上し、高い実用性を示した

<div class="two-col">
  <div class="col">
    <p class="bold">総合的な性能向上</p>
    <ul>
      <li>提案した3つの手法をすべて統合した場合、従来手法の組み合わせと比較して、文字認識の<span class="bold red-text" style="font-size: 1.2em;">正答率が約2倍に向上</span></li>
    </ul>
    <br>
    <p class="bold">実用面でのインパクト</p>
    <ul>
      <li>犯罪捜査における<span class="bold red-text" style="font-size: 1.2em;">車両の絞り込み台数を従来の約2%にまで削減</span>できる可能性を示唆</li>
      <li>捜査の大幅な効率化と、人的・時間的コストの劇的な削減に貢献</li>
    </ul>
  </div>
  <div class="col">
    <p class="bold text-center">劣化強度と平均候補数の関係 (<span class="ref-inline">論文図5.12</span>)</p>
    <p class="text-center">[図: 劣化が強くなっても、提案手法(紫の線)は実用レベルの平均候補数(赤の破線)以下を維持しているグラフ]</p>
    <p>提案手法は、幅広い劣化強度に対して<span class="bold">実用的な候補数（平均2候補以下）</span>で正解を提示できる。</p>
  </div>
</div>

---

<!-- class: content-gray show-page -->

## 考察
提案手法群は、相乗効果により複合劣化画像に対する頑健性を高めた

-   **各手法の専門性**: 3つの手法が「環境光」「低解像度」「多様な劣化」という異なる課題にそれぞれ特化して対応したことで、総合的な性能が向上したと考えられる。
-   **劣化が強い状況での優位性**: 特に多重構造CNNは、劣化が強くなるほど従来法との差が開き、適応性の高さが示された。これは、劣化に応じて適切な解像度の情報を自動的に選択できるアーキテクチャの有効性を示唆している。
-   **実用性の高さ**: 1候補目での正答率も従来法より高く（<span class="ref-inline">表5.8</span>）、平均候補数も少ない（<span class="ref-inline">図5.12</span>）ことから、提案手法は単に最終的な正答率が高いだけでなく、捜査の初期段階で迅速に有力な候補を提示できる実用性を備えている。
-   **相乗効果**: 画質改善（提案1, 2）によって文字認識（提案3）の入力がクリーンになり、認識精度がさらに向上するという相乗効果が確認された。

---

<!-- class: content-gray show-page -->

## 今後の課題
本研究の限界と将来の展望

-   **ナンバープレート領域抽出の自動化**: 本研究では領域抽出後の画像を扱っているが、実用上は画像全体からナンバープレート領域を正確に抽出する前処理が重要となる。この部分にも機械学習を導入し、さらに頑健性を高める必要がある。
-   **動いている車両への対応**: 本研究は静止している車両を主対象としている。走行中の車両で発生するモーションブラー（被写体ブレ）に対応するため、ブレ除去に特化したニューラルネットワークの導入が今後の課題となる。
-   **さらなる多様性への対応**: 緑色のプレートや異なるフォントなど、本研究で扱いきれなかった種類のナンバープレートへの汎化性能を高める必要がある。

---

<!-- class: content-gray show-page -->

## まとめ
本研究の貢献

1.  **複合劣化に対応する3つの手法を提案**
    - 環境光の外乱、低解像度、多様な劣化という3つの主要課題に対し、それぞれSVRを用いたRetinex処理、SVMを用いた超解像、多重構造CNNという機械学習ベースの手法を提案した。

2.  **従来法を大幅に上回る性能を実証**
    - 各手法がそれぞれの課題において従来法を最大32%上回る性能向上を達成し、その有効性を実験的に示した。

3.  **高い実用性と社会的インパクトを示唆**
    - 全手法の統合により、認識性能は従来比で約2倍に向上。これにより、犯罪捜査における車両絞り込み効率を飛躍的に高め、捜査コストを大幅に削減できる可能性を示した。
