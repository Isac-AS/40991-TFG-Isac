# coding=utf-8

from sqlalchemy import Column, String
from .entity import Entity, Base
from marshmallow import Schema, fields

class UserEntity(Entity, Base):
    __tablename__ = 'users'

    mail = Column(String)
    role = Column(String)
    password = Column(String)
    username = Column(String)

    def __init__(self, mail, role, password,username, created_by):
        Entity.__init__(self, created_by)
        self.mail = mail
        self.role = role
        self.password = password
        self.username = username

class UserSchema(Schema):
    id = fields.Number()
    mail = fields.Str()
    role = fields.Str()
    password = fields.Str()
    username = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()
    last_updated_by = fields.Str()
