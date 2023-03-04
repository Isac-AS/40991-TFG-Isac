# coding=utf-8

from sqlalchemy import Column, String
from .entity import Entity, Base


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