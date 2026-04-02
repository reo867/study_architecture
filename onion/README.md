# Onion TODO App

オニオンアーキテクチャの学習用ミニサンプルです。
目的は層（Domain -> Application -> Adapters）を分離した設計を理解することです。

ディレクトリ構成

```
onion/
  package.json
  tsconfig.json
  README.md
  src/
    domain/
      models/
        Task.ts
      ports/
        TaskRepository.ts
    application/
      TaskService.ts
    adapters/
      inbound/
        ExpressTaskController.ts
      outbound/
        InMemoryTaskRepository.ts
    app.ts
```

クイックスタート

1. 依存インストール

```
cd onion
npm install
```

2. 開発サーバ起動

```
npm run dev
```

3. API

GET  /api/tasks
POST /api/tasks       { "title": "..." }
PUT  /api/tasks/:id   { "title": "...", "completed": true }
DELETE /api/tasks/:id

このサンプルは永続化として in-memory 実装を用いています。
