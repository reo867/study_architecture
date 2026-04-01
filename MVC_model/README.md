# MVC ToDo (Flask)

MVCモデルの概念を学ぶための最小構成ToDoアプリです。
Controller → Model → View の責務分離を意識した構成になっています。

## ディレクトリ構成

```
MVC_model/
  app.py
  controllers/
    todo_controller.py
  models/
    todo_model.py
  views/
    todo_view.py
    templates/
      index.html
  static/
    style.css
  data/
    todo.db
  requirements.txt
  README.md
```

## MVCの役割

- Controller: ルーティングと入力処理、ModelとViewの呼び出しを担当
- Model: SQLiteへのCRUD、データの永続化を担当
- View: テンプレートでHTMLを生成し画面表示を担当

## 起動方法

1. 依存関係をインストール

```bash
pip install -r requirements.txt
```

2. アプリを起動

```bash
python app.py
```

3. ブラウザでアクセス

`http://127.0.0.1:5000/`

## 動作確認

- ToDoを追加できる
- 完了/未完了を切り替えできる
- 削除できる
- サーバ再起動後もToDoが残る（SQLite永続化）
- タイトル未入力時にエラー表示される
