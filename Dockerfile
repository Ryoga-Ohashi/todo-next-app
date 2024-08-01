FROM node:20-alpine

WORKDIR /nextjs

# パッケージファイルを先にコピーして依存関係をインストール
COPY package*.json ./

RUN npm install

# 残りのソースコードをコピー
COPY . .

# ビルドを実行（必要に応じて）
RUN npm run build

# 開発サーバーを起動
CMD ["npm", "run", "dev"]
