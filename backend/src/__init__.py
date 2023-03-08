from decouple import config
from flask import Flask, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_wtf.csrf import CSRFProtect, generate_csrf

# create flask application
app = Flask(__name__)
app.config.from_object(config("APP_SETTINGS"))

# login manager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.session_protection = "strong"

csrf = CSRFProtect(app)
cors = CORS(app)

bcrypt = Bcrypt(app)
db = SQLAlchemy(app)

# Registering blueprints
from src.accounts.views import accounts_bp
app.register_blueprint(accounts_bp)

from src.accounts.models import User
@login_manager.user_loader
def load_user(user_id):
    return User.query.filter(User.id == int(user_id)).first()
login_manager.login_view = "accounts.login"
login_manager.login_message_category = "danger"

# Common api methods
@app.route("/api/ping", methods=["GET", "POST"])
def home():
    #db.create_all()
    return jsonify({"ping": "pong!"})


@app.route("/api/getcsrf", methods=["GET"])
def get_csrf():
    token = generate_csrf()
    response = jsonify({"detail": "CSRF cookie set"})
    response.headers.set("X-CSRFToken", token)
    return response
