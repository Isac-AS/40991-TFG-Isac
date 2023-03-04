# coding=utf-8

from datetime import datetime
from sqlalchemy import create_engine, Column, String, Integer, DateTime
from sqlalchemy.orm import sessionmaker, declarative_base

db_url = 'tfg-db:5432'
db_name = 'tfg-db'
db_user = 'postgres'
db_password = 'pass'
engine = create_engine(f'postgresql://{db_user}:{db_password}@{db_url}/{db_name}', echo=True)
Session = sessionmaker(bind=engine)

Base = declarative_base()


class Entity():
    id = Column(Integer, primary_key=True)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    last_updated_by = Column(String)

    def __init__(self, created_by):
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.last_updated_by = created_by