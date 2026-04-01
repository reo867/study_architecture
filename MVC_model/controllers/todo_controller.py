from flask import Blueprint, redirect, request, url_for

from models.todo_model import add_todo, delete_todo, get_all_todos, toggle_todo
from views.todo_view import render_todo_list

todo_bp = Blueprint("todo", __name__)


@todo_bp.get("/")
def index():
    todos = get_all_todos()
    return render_todo_list(todos)


@todo_bp.post("/add")
def add():
    title = request.form.get("title", "").strip()
    if not title:
        todos = get_all_todos()
        return render_todo_list(todos, error="タイトルを入力してください。")

    add_todo(title)
    return redirect(url_for("todo.index"))


@todo_bp.post("/toggle/<int:todo_id>")
def toggle(todo_id: int):
    toggle_todo(todo_id)
    return redirect(url_for("todo.index"))


@todo_bp.post("/delete/<int:todo_id>")
def delete(todo_id: int):
    delete_todo(todo_id)
    return redirect(url_for("todo.index"))
