# coding=utf-8
import logging

from flask_cors import CORS
from flask import Flask, jsonify, request, session
from sqlalchemy import select
from flask_login import LoginManager

from .entities.entity import Session, engine, Base
from .entities.user_entity import UserEntity, UserSchema

# create flask application
app = Flask(__name__)
CORS(app)

app.secret_key = b'093a9c0bc5dc3daad418a86b4dde1b6b5f3caa07857c2e202ebeef8e74036697'
# login manager
login_manager = LoginManager()
login_manager.init_app(app)

# generate database schema
Base.metadata.create_all(engine)

@login_manager.user_loader
def load_user(user_id):

    return UserEntity.query.fil(user_id)

debug = False

@app.route("/users", methods = ['GET'])
def get_users():
    """Function used to fetch all users from the database"""
    db_session = Session()
    user_objects = db_session.query(UserEntity).all()

    # transforming into JSON
    schema = UserSchema(many=True)
    users = schema.dump(user_objects)

    db_session.close()
    return jsonify(users)

@app.route("/users/login", methods = ['POST'])
def get_password():
    """
    Function used to fetch the password from the given mail
    """
    mail = request.json.get('mail')
    password = request.json.get('password')
    # Database interaction
    db_session = Session()
    result = db_session.execute(select(UserEntity).where(UserEntity.mail == mail)) 
    entries = []
    for user_obj in result.scalars():
            entries.append({
                'password': user_obj.password,
                'username': user_obj.username,
                'role': user_obj.role
                })
            
    r = db_session.query()
    
    if debug:
        print(f"Inputted mail: {mail}\nInputted password:{password}")
        print(f"Number of entries: {len(entries)}")
        for entry in entries:
            print(f"Pass: {entry['password']}\nUname: {entry['username']}\nRole: {entry['role']}")

    # Check if no users with that mail
    if len(entries) == 0 or len(entries) > 1:
        db_session.close()
        return {'result': False}

    if password == entries[0]['password']:
        db_session.close()
        return {'result': True, 'username': entries[0]['username'], 'role': entries[0]['role']}

    db_session.close()
    return {'result': False}

@app.route("/users", methods = ['POST'])
def add_user():
    """
    Function used to register a new user
    The 4 user inputted fields will be extracted from the response.
    A new user entity will be created and added to the database if 
    there is no other entity with the same e-mail.
    """
    # User schema creation
    posted_user = UserSchema(only=('mail', 'role','password','username')).load(request.get_json())
    # User entity creation
    user = UserEntity(**posted_user, created_by="HTTP post request")

    # Database interaction
    db_session = Session()
    # Check if mail is in use
    result = db_session.execute(select(UserEntity).where(UserEntity.mail == user.mail))

    # Debug info
    if debug:
        print(f"Posted user:")
        print(f"Nombre: {request.json.get('username')}")
        print(f"Correo: {request.json.get('mail')}")
        print(f"Contraseña: {request.json.get('password')}")
        print(f"Rol: {request.json.get('role')}")
        for user_obj in result.scalars():
            print(f"Encontrado: {user_obj.username}, {user_obj.id}")
        print(f"Result.all() length: {len(result.all())}")

    if len(result.all()) > 0:
        db_session.close()
        return {'result': False, 'message': 'Correo electrónico ya en uso.'}, 201
    
    db_session.add(user)
    db_session.commit()
    db_session.close()

    return {'result': True}, 201
