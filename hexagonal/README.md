# Hexagonal TODO App

ヘキサゴナル（ポート＆アダプタ）アーキテクチャで実装した最小限の ToDo サンプルです。
学習を目的とし、ドメイン（core）と入出力アダプタ（primary/secondary）を明確に分離しています。

ディレクトリ構成

```
hexagonal/
  package.json
  tsconfig.json
  README.md
  src/
    domain/
      task.ts               # ドメインモデル
    ports/
      taskRepository.ts     # リポジトリポート（インターフェース）
    adapters/
      primary/
        expressTaskController.ts  # HTTP (Express) - Primary Adapter
      secondary/
        inMemoryTaskRepository.ts # In-memory - Secondary Adapter
    app.ts                  # アプリ起動と依存性注入（組み立て）
```

クイックスタート

1. 依存インストール

```
cd hexagonal
npm install
```

2. 開発サーバ起動（ts-node-dev 推奨）

```
npm run dev
```

3. ブラウザ or curl でアクセス

`http://localhost:3000/api/tasks`

API は既存 README と同じ形（GET/POST/PUT/DELETE）を提供します。

目的は構造を理解することなので、永続化は最小限（in-memory）の実装を含めています。
