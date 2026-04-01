# Monolithic TODO App

単一プロセスで REST API と簡易UIを提供する、モノリシック構成のTODO管理システムです。Controller → Service → Repository → DB のレイヤ分割を明確にし、学習用に把握しやすい構成にしています。

## できること

- タスクの作成 / 取得 / 更新 / 削除
- 完了状態の切り替え
- ブラウザUIでの一覧・追加・削除

## 技術構成

- Node.js + TypeScript + Express
- SQLite（`data/app.db`）

## ディレクトリ構成

```
monolithic/
  src/
    controllers/   # HTTP層
    services/      # ビジネスロジック
    repositories/  # データアクセス
    infrastructure/# DB初期化/接続
    models/        # 型定義
    middlewares/   # エラーハンドリング
    routes/        # ルーティング
  public/          # UI（HTML/CSS/JS）
  tests/           # 単体テスト
  data/            # SQLite DBファイル
```

## 実行方法

### 1. 依存関係のインストール

```
npm install
```

### 2. 開発サーバ起動

```
npm run dev
```

起動後、`http://localhost:3000` にアクセスしてください。

### 3. 本番ビルドと起動

```
npm run build
npm start
```

## API 仕様

### Task

```
{
  id: number,
  title: string,
  completed: boolean,
  createdAt: string (ISO)
}
```

### エンドポイント

- `GET /api/tasks` : 全タスク一覧
- `GET /api/tasks/:id` : 単一取得
- `POST /api/tasks` : 作成（`{ title: string }`）
- `PUT /api/tasks/:id` : 更新（`{ title?: string, completed?: boolean }`）
- `DELETE /api/tasks/:id` : 削除

### エラーレスポンス

- 400: バリデーションエラー
- 404: 対象が存在しない
- 500: サーバ内部エラー

## cURL 例

```
# 作成
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"買い物"}'

# 一覧
curl http://localhost:3000/api/tasks

# 更新
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# 削除
curl -X DELETE http://localhost:3000/api/tasks/1
```

## テスト

```
npm test
```

## 環境変数

- `PORT` : サーバポート（デフォルト `3000`）

## 補足

- SQLiteファイルは `data/app.db` に作成されます。
- UI は最小構成の 1 画面です。
