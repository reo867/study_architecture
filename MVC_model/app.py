from flask import Flask

from controllers.todo_controller import todo_bp
from models.todo_model import init_db


def create_app() -> Flask:
    app = Flask(
        __name__,
        template_folder="views/templates",
        static_folder="static",
    )

    init_db()
    app.register_blueprint(todo_bp)

    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
