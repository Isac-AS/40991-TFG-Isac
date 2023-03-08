from flask import Blueprint, flash, jsonify, redirect, render_template, request, url_for
from flask_login import current_user, login_required, login_user, logout_user

from src import db, login_manager, bcrypt
from src.accounts.models import User

accounts_bp = Blueprint("accounts", __name__)
debug = True

# CRUD functionality
@accounts_bp.route("/accounts/get_users", methods=["GET"])
def get_users():
    """Function used to fetch all users from the database"""
    user_objects = User.query.all()
    dictionaries = [user.as_dict() for user in user_objects]
    return jsonify(dictionaries)

# LOGIN related functionality
@accounts_bp.route("/register", methods=["POST"])
def register():
    """
    Function used to register a new user
    The 4 user inputted fields will be extracted from the response.
    A new user entity will be created and added to the database if 
    there is no other entity with the same e-mail.
    """
    if current_user.is_authenticated:
        return jsonify({'result': False, 'message': 'Hay un usuario registrado en la sesión.', 'user': None}), 201
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
        return jsonify({'result': False, 'message': 'Correo electrónico ya en uso.', 'user': None}), 201
    
    db.session.add(user)
    db.session.commit()
    login_user(user)

    return jsonify({'result': True, 'message': 'Éxito en el registro de usuario.', 'user': user.as_dict()}), 201


@accounts_bp.route("/login", methods=["POST"])
def login():
    if current_user.is_authenticated:
        return jsonify({'result': False, 'message': 'Hay un usuario registrado en la sesión.', 'user': None}), 201
    
    data = request.json
    email = data.get("email")
    password = data.get("password")

    # Look for the email
    user: User = db.session.execute(db.select(User).filter_by(email = email)).scalar_one()

    if debug:
        print(f"Attempt:\nEmail: {email}\nPassword: {password}")
        print(f"DB object:\n{user.as_dict()}")
        print(f"Check password hash: {bcrypt.check_password_hash(user.password, password)}")
    
    if bcrypt.check_password_hash(user.password, password):
        login_user(user)
        print(current_user)
        return jsonify({'result': True, 'message': 'Éxito en el inicio de sesión.', 'user': user.as_dict()}), 201
    return jsonify({'result': False, 'message': 'Error en el inicio de sesión.', 'user': None}), 201


@accounts_bp.route("/logout", methods=["GET"])
#@login_required
def logout():
    print("Before logout:")
    print_logged_in_user()
    logout_user()
    print("\nAfter logout:")
    print_logged_in_user()
    return jsonify({'result': True, 'message': 'Sesión cerrada con éxito.', 'user': None})


@accounts_bp.route("/accounts/current_user_data", methods=["GET"])
def user_data():
    if current_user.is_authenticated:
        user = login_manager.load_user(current_user.id)
        print_logged_in_user()
        return jsonify({'result': True, 'message': 'Usuario autenticado con los siguientes datos.', 'user': user.as_dict()})
    return jsonify({'result': False, 'message': 'No hay ningún usuario autenticado.', 'user': None})

@accounts_bp.route("/accounts/getsession", methods=["GET"])
def check_session():
    print(current_user)
    if current_user.is_authenticated:
        return jsonify({'result': True, 'message': 'Hay un usuario autenticado.', 'user': None})
    return jsonify({'result': False, 'message': 'No hay ningún usuario autenticado.', 'user': None})

def print_logged_in_user():
    if debug:
        print("Logged in user:")
        print(f"Username: {current_user.username}")
        print(f"Is authenticated: {current_user.is_authenticated}")
        print(f"Is active: {current_user.is_active}")
        print(f"Is anonymous: {current_user.is_anonymous}")
        print(f"Id: {current_user.get_id()}")