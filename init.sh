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
npx marp --config-file ./.marprc.yml --pdf ./data/sample-step2.md --allow-local-files
npx marp --config-file ./.marprc.yml --pptx --pptx-editable ./data/sample-step3.md --allow-local-files
