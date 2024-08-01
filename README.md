# アプリケーションの説明
- next.jsとtypescript, Go言語を使用してTodoリストを作成しました。

# 実行方法
- `docker compose up -d`を実行
- [localhost](http://localhost:3000/)に接続

# 課題内容
## 課題
- Rest APIを利用したWebアプリケーションを作る。
- アプリの種類は問わない。簡易的なもので良い。
- 例えば、Todoリスト、掲示板など。
## 要件
***必須***
1. フロントエンド    
   1. [x] React (Next.js) と TypeScript を使用
   2. [x] UIフレームワークにAntDesignを使用
2. バックエンド
   1. [x] Go言語を使用
3. 開発環境    
   - [x] git でバージョン管理を行い、GitHub にアップロードする    
   - [x] Dockerを使ったローカル開発環境構築
***なお良い（できてなくてもOK）***
   - [ ] lint, test の導入
   - [ ] OpenAPI でのスキーマ定義
   - [ ] GitHub Actions での CI/CD 構築
   - [x] PostgreSQL を使用
   - [x] README.mdの作成


# フォルダ構成

## next.js内のsrcファイル
```
src
├── app
│   ├── api.ts
│   ├── components
│   │   ├── AddTask.tsx
│   │   ├── Todo.tsx
│   │   ├── TodoList.module.css
│   │   ├── TodoList.tsx
│   │   └── header.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.module.css
│   └── page.tsx
└── types
    └── tasks.ts
```

## バックエンド
```
backend
├── Dockerfile
├── docker-compose.yml
├── go.mod
├── go.sum
├── main.go
└── script
```

# githubページ
- https://github.com/Ryoga-Ohashi/todo-next-app.git

# SQLテーブル
| カラムの名前 | データ型 |         オプション          |
| ------------ | -------- | --------------------------- |
| ID           | UUID     | "primary_key"               |
| Task         | String   | "size:255"                  |
| IsCompleted  | Bool     | "default:false"             |
| CreatedAt    | Time     | "default:CURRENT_TIMESTAMP" |
| UpdatedAt    | Time     | "default:CURRENT_TIMESTAMP" |


