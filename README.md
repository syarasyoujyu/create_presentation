# create_presentation

arXiv論文のPDFをローカルで読み込み、Geminiで要約し、その結果からMarpスライドMarkdownまで作る最小プロトタイプです。

## できること

- PDFをブラウザからアップロード
- 任意のプロンプトと一緒にGeminiへ送信して論文を整理
- Step 2では専用に選んだPDFを参照しながらMarpスライドMarkdownを生成
- Step 1の結果や手入力メモを補助情報として渡せる
- 自分で決めたスライドの流れ・章立ても指定可能
- Marp Markdownのコピーと、好きな名前で `data/` へ保存

## 起動方法

1. `.env.example` を `.env` にコピーして `GEMINI_API_KEY` を設定
2. サーバーを起動

```bash
npm start
```

3. ブラウザで `http://localhost:3000` を開く

## アプリの流れ

1. Step 1でPDFをGeminiに送り、論文の背景・手法・結果などを整理
2. Step 2で専用に選んだPDFを一次情報として参照しながら、KaiRA向けMarpテンプレートのスライドMarkdownを生成
3. 必要なら、ユーザーが指定したスライドの流れ・章立てを優先して構成

Step 2は単体でPDFを受け取って生成できます。Step 1の要約や手入力メモ、流れ指定は任意の補助情報です。

## 主なファイル

- `server.js`: ローカルHTTPサーバーとGemini連携
- `public/app.js`: Step 1のPDF解析UI
- `public/slide-generator.js`: Step 2のスライド生成UI
- `data/`: 生成したMarp Markdownの保存先
- `prompts/marp-template.md`: Marpテンプレート本体
- `prompts/build-slide-prompt.js`: Step 2用のGemini prompt生成

## 環境変数

- `GEMINI_API_KEY`: Gemini APIキー
- `GEMINI_MODEL`: 省略時のモデル名。デフォルトは `gemini-2.5-pro`
- `PORT`: ローカルサーバーのポート。デフォルトは `3000`
- `HOST`: 待ち受けホスト。デフォルトは `127.0.0.1`

## 補足

- 現段階ではPDFをそのままGeminiへ渡し、Step 2でもPDFを参照しながらMarp Markdownを生成する初期版です
- 大きいPDFではブラウザ経由のbase64送信が重くなるため、次段階ではFiles API化やarXiv URL直接取得に進めるのがおすすめです
