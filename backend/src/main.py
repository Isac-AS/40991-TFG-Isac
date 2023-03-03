# coding=utf-8

#from .entities.entity import Session, engine, Base
#from .entities.user_entity import UserEntity
import importlib.util
import sys
entity_spec = importlib.util.spec_from_file_location("Entity", "/opt/40991-TFG-Isac/backend/src/entities/entity.py")
entity_module = importlib.util.module_from_spec(entity_spec)
sys.modules["entity"] = entity_module
entity_spec.loader.exec_module(entity_module)
print(f"\nSe ha importado:\n{entity_module.Entity}\n")
"""print(f"Se muestra:\n{entity_module.Base}\n")
print(f"Se muestra:\n{entity_module.engine}\n")
print(f"Se muestra:\n{entity_module.Session}\n")"""

Base = entity_module.Base
engine = entity_module.engine
Session = entity_module.Session


user_entity_spec = importlib.util.spec_from_file_location("UserEntity", "/opt/40991-TFG-Isac/backend/src/entities/user_entity.py")
user_entity_module = importlib.util.module_from_spec(user_entity_spec)
sys.modules["entity"] = user_entity_module
user_entity_spec.loader.exec_module(user_entity_module)
print(f"\nSe ha importado:\n{user_entity_module}\n")
print(f"Se muestra:\n{user_entity_spec}\n\n")




# generate database schema
Base.metadata.create_all(engine)

# start session
session = Session()

# check for existing data
records = session.query(user_entity_module.UserEntity).all()

if len(records) == 0:
    # create and persist mock exam
    python_user = user_entity_module.UserEntity(mail="fulanito@gmail.com", created_by="script", password="prueba", role="none", username="pepe")
    session.add(python_user)
    session.commit()
    session.close()

    # reload exams
    users = session.query(user_entity_module.UserEntity).all()

# show existing users
print('### Users:')
for user in users:
    print(f'({user.id}):\nMail: {user.mail}\nUsername: {user.username}\nPassword: {user.password}\nRole: {user.role}\nCreated by{user.created_by}\n')