# Clean TODO App

クリーンアーキテクチャの学習用ミニサンプルです。
目的は層（Entities -> UseCases -> Interfaces -> Frameworks/Drivers）を分離した設計を理解することです。

ディレクトリ構成

```
clean/
  package.json
  tsconfig.json
  README.md
  src/
    entities/
      Task.ts
    usecases/
      TaskUseCase.ts
    interfaces/
      controllers/
        HttpTaskController.ts
      repositories/
        TaskRepository.ts
    frameworks/
      web/
        ExpressServer.ts
      persistence/
        InMemoryTaskRepository.ts
    app.ts
```

クイックスタート

1. 依存インストール

```
cd clean
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
