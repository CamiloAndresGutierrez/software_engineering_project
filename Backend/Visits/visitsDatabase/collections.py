import pymongo
from pymongo import MongoClient

client = MongoClient("mongodb://3.131.83.165:27017")
db1 = client["visitsDB"]
db2 = client["userDB"]
db3 = client["testsDB"]
db4 = client["parametersDB"]