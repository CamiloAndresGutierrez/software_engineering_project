from flask import Flask, render_template, request, jsonify
import pymongo
from pymongo import MongoClient
import jwt
from userService.model.citizen import Citizen
from userService.constant.constants import SECRET_KEY as SK
from userService.constant.constants import ROL as rol
from userDatabase.collections import db
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

establishmentCollection = db["establishmentCollection"]
citizenCollection = db["citizenCollection"]
healthEntityCollection = db["healthEntityCollection"]

@app.route("/login", methods=["GET"])
def main():
    return jsonify({"response": "Hola desde back"})

@app.route("/registration/establishment", methods=['POST'])
def estRegistration():
    req_ = request.json
    nit = req_['NIT']
    name = req_['name']
    phone = req_['phone']
    email = req_['email']
    username = req_['username']
    password = req_['password']
    address = req_['address']
    encoded_password = jwt.encode({"password":password}, SK, algorithm="HS256").decode('utf-8')

    registeredUser = establishmentCollection.find_one({"nit" : nit, "email" : email, "username" : username})
    
    valid_username_PE = establishmentCollection.find_one({"username" : username})
    valid_username_HE = healthEntityCollection.find_one({"username" : username})
    valid_username_cit = citizenCollection.find_one({"username" : username})

    flag = True if valid_username_HE == valid_username_PE == valid_username_cit == None else False

    if(flag):
        if(registeredUser != None):
            return {"response" : "failed"}
        else:
            establishmentCollection.insert_one({"nit":nit, "name": name, "phone" : [phone], "email" : email, "username": username, "password":encoded_password, "address" : address})
            return {"response" : "success"}
    else:
        return {"response":"username_failed"}

@app.route("/registration/citizen", methods=["POST"])
def citRegistration():
    req_ = request.json
    name = req_['name']
    surname = req_['surname']
    username = req_['username']
    password = req_['password']
    id_ = req_['id']
    address = req_['address']
    gender = req_['gender']
    encoded_password = jwt.encode({"password":password}, SK, algorithm="HS256").decode('utf-8')
    
    registeredUser = citizenCollection.find_one({"username" : username , "id" : id_})
    
    valid_username_PE = establishmentCollection.find_one({"username" : username})
    valid_username_HE = healthEntityCollection.find_one({"username" : username})
    valid_username_cit = citizenCollection.find_one({"username" : username})

    flag = True if valid_username_HE == valid_username_PE == valid_username_cit == None else False

    if(flag):
        if(registeredUser != None):
            return {"response" : "failed"}
        else:
            citizenCollection.insert_one({"name":name, "surname": surname, "username":username, "password" : encoded_password, "gender": gender, "document" : "" ,"id" : id_, "department" : "" , "municipality" : "" , "neighbourhood" : "" , "address": address})
            return {"response" : "success"} 
    else:
        return {"response":"username_failed"}

@app.route("/registration/healthEntity", methods=["POST"])
def healthEntityRegistration():
    req_ = request.json
    nit = req_['NIT']
    name = req_['name']
    phone = req_['phone']
    email = req_['email']
    username = req_['username']
    password = req_['password']
    address = req_['address']
    encoded_password = jwt.encode({"password":password}, SK, algorithm="HS256").decode('utf-8')
    
    registeredUser = healthEntityCollection.find_one({"nit" : nit, "email" : email, "username" : username})
    
    valid_username_PE = establishmentCollection.find_one({"username" : username})
    valid_username_HE = healthEntityCollection.find_one({"username" : username})
    valid_username_cit = citizenCollection.find_one({"username" : username})

    flag = True if valid_username_HE == valid_username_PE == valid_username_cit == None else False

    if(flag):
        if(registeredUser != None):
            return {"response" : "failed"}
        else:
            healthEntityCollection.insert_one({"nit":nit, "name": name, "phone" : [phone], "email" : email, "username": username, "password":encoded_password, "address" : address})
            return {"response" : "success"} 
    else:
        return {"response":"username_failed"}

@app.route("/login", methods=["POST"])
def login():
    req_ = request.json
    username = req_['username']
    password = req_['password']
    encoded_password = jwt.encode({"password":password}, SK, algorithm="HS256").decode('utf-8')

    isitHE = healthEntityCollection.find_one({"username" : username, "password" : encoded_password})
    isitPE = establishmentCollection.find_one({"username" : username, "password" : encoded_password})
    isitC = citizenCollection.find_one({"username" : username, "password" : encoded_password})
    
    flag = True if isitHE == isitPE == isitC == None else False

    if(not flag):
        if(isitC != None):
            token = jwt.encode({"username": isitC['username'], "rol" : rol[1]}, SK, algorithm="HS256").decode('utf-8')
            return jsonify({"response" :  token})
        if(isitHE != None):
            token = jwt.encode({"username": isitHE['username'], "rol" : rol[3]}, SK, algorithm="HS256").decode('utf-8')
            return jsonify({"response" : token})
        if(isitPE != None):
            token = jwt.encode({"username": isitPE['username'], "rol" : rol[2]}, SK, algorithm="HS256").decode('utf-8')
            return jsonify({"response" : token})
    else: 
        return jsonify({"response" : "404"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)


