#!/bin/bash
cd "$(dirname "$0")/.." || exit 1
if ! command -v python3 >/dev/null 2>&1; then
  echo "需要安装 Python 3。也可以直接用浏览器打开 index.html。"
  read -r -p "按回车退出..."
  exit 1
fi
(sleep 1; open 'http://localhost:8765/') &
echo 'Physics Quest: http://localhost:8765/'
python3 -m http.server 8765
