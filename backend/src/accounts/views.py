from flask import Blueprint, flash, jsonify, redirect, render_template, request, url_for
from flask_login import login_user

from src import db
from src.accounts.models import User


accounts_bp = Blueprint("accounts", __name__)
debug = True

@accounts_bp.route("/register", methods=["POST"])
def register():
    """
    Function used to register a new user
    The 4 user inputted fields will be extracted from the response.
    A new user entity will be created and added to the database if 
    there is no other entity with the same e-mail.
    """
    # User schema creation
    user = User(
        username=request.json.get('username'),
        email=request.json.get('email'),
        role=request.json.get('role'),
        password=request.json.get('password'),
        created_by='Self-registration'
        )

    # Check if mail is in use
    result = db.session.execute(db.select(User).where(User.email == user.email))

    # Debug info
    if debug:
        print(f"Posted user:")
        print(f"Nombre: {request.json.get('username')}")
        print(f"Correo: {request.json.get('email')}")
        print(f"Contraseña: {request.json.get('password')}")
        print(f"Rol: {request.json.get('role')}")
        for user_obj in result.scalars():
            print(f"Encontrado: {user_obj.username}, {user_obj.id}")
        print(f"Result.all() length: {len(result.all())}")

    if len(result.all()) > 0:
        return {'result': False, 'message': 'Correo electrónico ya en uso.'}, 201
    
    db.session.add(user)
    db.session.commit()

    return {'result': True}, 201

@accounts_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    # Look for the email
    user: User = db.session.execute(db.select(User).filter_by(email = email)).scalar_one()

    if password == user.password:
        login_user(User)
        return jsonify({"login": True})
    return jsonify({"login": False})

@accounts_bp.route("/accounts/get_users", methods=["GET"])
def get_users():
    """Function used to fetch all users from the database"""
    user_objects = User.query.all()
    dictionaries = [user.as_dict() for user in user_objects]
    return jsonify(dictionaries)
