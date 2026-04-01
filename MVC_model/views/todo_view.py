from flask import render_template


def render_todo_list(todos, error: str | None = None):
    return render_template("index.html", todos=todos, error=error)
