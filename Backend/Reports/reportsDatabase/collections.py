import pymongo
from pymongo import MongoClient


client = MongoClient("mongodb://3.131.83.165:27017")
db1 = client["testsDB"]
db2 = client["userDB"]
db3 = client["visitsDB"]
