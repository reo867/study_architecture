import os
import sqlite3
from typing import List, Dict

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "data", "todo.db")


def init_db() -> None:
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)

    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS todos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                is_done INTEGER NOT NULL DEFAULT 0
            )
            """
        )
        conn.commit()


def _fetch_all(query: str, params: tuple = ()) -> List[Dict]:
    with sqlite3.connect(DB_PATH) as conn:
        conn.row_factory = sqlite3.Row
        rows = conn.execute(query, params).fetchall()

    return [
        {"id": row["id"], "title": row["title"], "is_done": bool(row["is_done"])}
        for row in rows
    ]


def get_all_todos() -> List[Dict]:
    return _fetch_all("SELECT id, title, is_done FROM todos ORDER BY id DESC")


def add_todo(title: str) -> None:
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute("INSERT INTO todos (title, is_done) VALUES (?, 0)", (title,))
        conn.commit()


def toggle_todo(todo_id: int) -> None:
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute(
            """
            UPDATE todos
            SET is_done = CASE WHEN is_done = 1 THEN 0 ELSE 1 END
            WHERE id = ?
            """,
            (todo_id,),
        )
        conn.commit()

def update_todo_title(todo_id: int, new_title: str) -> None:
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute("UPDATE todos SET title = ? WHERE id = ?", (new_title, todo_id))
        conn.commit()


def delete_todo(todo_id: int) -> None:
    with sqlite3.connect(DB_PATH) as conn:
        conn.execute("DELETE FROM todos WHERE id = ?", (todo_id,))
        conn.commit()
