from datetime import datetime
from flask_login import UserMixin
from src import bcrypt, db


class User(UserMixin, db.Model):

    __tablename__ = "users"

    # User specific fields
    email = db.Column(db.String, unique=True, nullable=False)
    username = db.Column(db.String, unique=False, nullable=False)
    password = db.Column(db.String, nullable=False)
    role = db.Column(db.Integer, nullable=False, default=False)
    is_admin = db.Column(db.Boolean, nullable=False, default=False)

    # Additional data
    id = db.Column(db.Integer, primary_key=True)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
    created_by = db.Column(db.String, nullable=False)
    last_modified_by = db.Column(db.String, nullable=True)

    def __init__(self, username, email, password, role, created_by, is_admin=False):
        self.username = username
        self.email = email
        self.role = role
        self.password = bcrypt.generate_password_hash(password)
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.is_admin = is_admin
        self.created_by = created_by
        self.last_modified_by = created_by

    def __repr__(self):
        return f"User: <Username: {self.username}><Email: {self.email}>"
