# 2-Layer TODO App

2層アーキテクチャ（Presentation + Data）を学ぶための最小構成ToDoアプリです。
Controllerが直接Repositoryを呼び出し、Service層は置かないことで「2層らしさ」を明確にしています。

## ディレクトリ構成

```
2_layer/
  src/
    app.ts
    presentation/
      taskController.ts
      taskRoutes.ts
      errorHandler.ts
      errors.ts
      asyncHandler.ts
    data/
      task.ts
      taskRepository.ts
      sqliteTaskRepository.ts
      db.ts
  public/
    index.html
    app.js
    styles.css
  data/         # 実行時に SQLite DB が作成される
  package.json
  tsconfig.json
  README.md
```

## 2層の責務

- Presentation層: ルーティング / 入力検証 / エラーハンドリング / HTTPレスポンス
- Data層: SQLiteへのCRUD / 永続化

## 起動方法

1. 依存関係をインストール

```
npm install
```

2. 開発サーバを起動

```
npm run dev
```

3. ブラウザでアクセス

`http://localhost:3000`

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

## 補足

- SQLiteファイルは `data/app.db` に作成されます。
- UI は最小構成の 1 画面です。
