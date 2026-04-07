#marp用(設定・ubuntu)
sudo apt install fonts-noto
npm install -g @marp-team/marp-cli
sudo apt install chromium-browser
export CHROME_PATH=$(which chromium-browser)
sudo apt install libreoffice
sudo apt install fonts-noto-cjk

#アプリ用
node server.js

#marp出力結果をpptx or pdfに変換
cd data
marp --pdf sample-step2.md  --allow-local-files
marp --pptx --pptx-editable sample-step3.md  --allow-local-files