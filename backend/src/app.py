# coding=utf-8

from flask_cors import CORS
from flask import Flask, jsonify, request

from .entities.entity import Session, engine, Base
from .entities.user_entity import UserEntity, UserSchema

# create flask application
app = Flask(__name__)
CORS(app)

# generate database schema
print("\nCreación del esquema:\n")
Base.metadata.create_all(engine)

@app.route("/users")
def get_users():
    #fetching users from the database
    session = Session()
    user_objects = session.query(UserEntity).all()

    # transforming into JSON
    schema = UserSchema(many=True)
    users = schema.dump(user_objects)

    session.close()
    return jsonify(users)

@app.route("/users", methods = ['POST'])
def add_user():
    # mount user objectç
    posted_user = UserSchema(only=('mail', 'role','password','username')).load(request.get_json())
    print(posted_user)
    user = UserEntity(**posted_user, created_by="HTTP post request")

    #persist the user
    session = Session()
    session.add(user)
    session.commit()

    # return created user
    new_user = UserSchema().dump(user)
    session.close()
    return jsonify(new_user), 201
