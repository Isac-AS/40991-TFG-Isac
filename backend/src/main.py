# coding=utf-8

from entities.entity import Session, engine, Base
from entities.user_entity import UserEntity

# generate database schema
print("\nCreación del esquema:\n")
Base.metadata.create_all(engine)

# start session
print("\nCreación de la sesión:")
session = Session()
print(f"Session:\n{session}\n")

# check for existing data
print("\n\nProceeding to query:\n")
users = session.query(UserEntity).all()

if len(users) == 0:
    # create and persist mock exam
    python_user = UserEntity(mail="fulanito@gmail.com", created_by="script", password="prueba", role="none", username="pepe")
    print(f"Session:\n{session}\n\n")
    session.add(python_user)
    session.commit()
    session.close()

    # reload users
    users = session.query(UserEntity).all()

# show existing users
print('### Users:')
for user in users:
    print(f'({user.id}):\nMail: {user.mail}\nUsername: {user.username}\nPassword: {user.password}\nRole: {user.role}\nCreated by: {user.last_updated_by}\n')