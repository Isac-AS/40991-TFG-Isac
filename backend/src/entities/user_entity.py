# coding=utf-8

import importlib
import sys
from sqlalchemy import Column, String
#from entity import Entity, Base

entity_spec = importlib.util.spec_from_file_location("Entity", "/opt/40991-TFG-Isac/backend/src/entities/entity.py")
entity_module = importlib.util.module_from_spec(entity_spec)
sys.modules["entity"] = entity_module
entity_spec.loader.exec_module(entity_module)

class UserEntity(entity_module.Entity, entity_module.Base):
    __tablename__ = 'users'

    mail = Column(String)
    role = Column(String)
    password = Column(String)
    username = Column(String)

    def __init__(self, mail, role, password,username, created_by):
        entity_module.Entity.__init__(self, created_by)
        self.mail = mail
        self.role = role
        self.password = password
        self.username = username