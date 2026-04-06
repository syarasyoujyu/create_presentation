#marp用(設定・ubuntu)
sudo apt install fonts-noto
npm install -g @marp-team/marp-cli
sudo apt install chromium-browser
export CHROME_PATH=$(which chromium-browser)


#アプリ用
node server.js

#marp出力結果をpptx or pdfに変換
marp --pdf sample.md
marp --pptx sample.md