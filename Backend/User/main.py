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
adminCollection = db['adminCollection']

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
    dep = req_['departments']
    mun = req_['municipalities']
    ngh = req_['neighborhoods']
    cat = req_['category']

    encoded_password = jwt.encode({"password":password}, SK, algorithm="HS256").decode('utf-8')

    registeredUser = establishmentCollection.find_one({"nit" : nit, "email" : email, "username" : username})
    
    valid_username_PE = establishmentCollection.find_one({"username" : username})
    valid_username_HE = healthEntityCollection.find_one({"username" : username})
    valid_username_cit = citizenCollection.find_one({"username" : username})
    valid_username_Admin = adminCollection.find_one({"username" : username})

    valid_id = establishmentCollection.find_one({"nit" : nit})


    flag = True if valid_username_HE == valid_username_PE == valid_username_cit == valid_username_Admin == None else False
    flag2 = True if valid_id == None else False
    if(flag and flag2):
        if(registeredUser != None):
            return {"response" : "failed"}
        else:
            establishmentCollection.insert_one({"veredict": "pending","nit":nit, "name": name, "phone" : [phone], "email" : email, "username": username, "password":encoded_password, "address" : address, "departments" : dep, "municipality" : mun, "neighborhood" : ngh, "category" : cat})
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
    doc = req_['document']
    id_ = req_['id']
    gender = req_['gender']
    dep = req_['departments']
    mun = req_['municipalities']
    ngh = req_['neighborhoods']
    address = req_['address']

    encoded_password = jwt.encode({"password":password}, SK, algorithm="HS256").decode('utf-8')
    
    registeredUser = citizenCollection.find_one({"username" : username , "id" : id_})
    
    valid_username_PE = establishmentCollection.find_one({"username" : username})
    valid_username_HE = healthEntityCollection.find_one({"username" : username})
    valid_username_cit = citizenCollection.find_one({"username" : username})
    valid_username_Admin = adminCollection.find_one({"username" : username})

    valid_id = citizenCollection.find_one({"id" : id_})
    
    flag = True if valid_username_HE == valid_username_PE == valid_username_cit == valid_username_Admin == None else False
    flag2 = True if valid_id == None else False

    if(flag and flag2):
        if(registeredUser != None):
            return {"response" : "failed"}
        else:
            citizenCollection.insert_one({"name":name, "surname": surname, "username":username, "password" : encoded_password, "gender": gender, "document" : doc ,"id" : id_, "department" : dep , "municipality" : mun , "neighbourhood" : ngh , "address": address})
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
    dep = req_['departments']
    mun = req_['municipalities']
    ngh = req_['neighborhoods']

    encoded_password = jwt.encode({"password":password}, SK, algorithm="HS256").decode('utf-8')
    
    registeredUser = healthEntityCollection.find_one({"nit" : nit, "email" : email, "username" : username})
    
    valid_username_PE = establishmentCollection.find_one({"username" : username})
    valid_username_HE = healthEntityCollection.find_one({"username" : username})
    valid_username_cit = citizenCollection.find_one({"username" : username})
    valid_username_Admin = adminCollection.find_one({"username" : username})

    valid_id = healthEntityCollection.find_one({"nit" : nit})

    flag = True if valid_username_HE == valid_username_PE == valid_username_cit == valid_username_Admin == None else False
    flag2 = True if valid_id == None else False

    if(flag and flag2):
        if(registeredUser != None):
            return {"response" : "failed"}
        else:
            healthEntityCollection.insert_one({"veredict": "pending","nit":nit, "name": name, "phone" : [phone], "email" : email, "username": username, "password":encoded_password, "address" : address, "department" : dep, "municipality": mun, "neighborhood": ngh})
            return {"response" : "success"} 
    else:
        return {"response":"username_failed"}

@app.route("/add/admin", methods=["POST"])
def add_admin():
    req_ = request.json
    name = req_['name']
    surname = req_['surname']
    username = req_['username']
    password = req_['password']
    doc = req_['document']
    id_ = req_['id']

    encoded_password = jwt.encode({"password":password}, SK, algorithm="HS256").decode('utf-8')


    valid_username_PE = establishmentCollection.find_one({"username" : username})
    valid_username_HE = healthEntityCollection.find_one({"username" : username})
    valid_username_cit = citizenCollection.find_one({"username" : username})
    valid_username_Admin = adminCollection.find_one({"username" : username})

    registeredUser = adminCollection.find_one({"username" : username , "id" : id_})

    valid_id = adminCollection.find_one({"id" : id_})
    
    flag = True if valid_username_HE == valid_username_PE == valid_username_cit == valid_username_Admin == None else False
    flag2 = True if valid_id == None else False

    if(flag and flag2):
        if(registeredUser != None):
            return {"response" : "failed"}
        else:
            adminCollection.insert_one({"name":name, "surname": surname, "username":username, "password" : encoded_password, "document" : doc ,"id" : id_ })
            return {"response" : "success"} 
    else:
        return {"response":"username_failed"}

@app.route("/login", methods=["POST"])
def login():
    req_ = request.json
    username = req_['username']
    password = req_['password']
    encoded_password = jwt.encode({"password":password}, SK, algorithm="HS256").decode('utf-8')

    isitHE = healthEntityCollection.find_one({"username" : username, "password" : encoded_password, "veredict" : "accepted"})
    isitPE = establishmentCollection.find_one({"username" : username, "password" : encoded_password, "veredict" : "accepted"})
    isitC = citizenCollection.find_one({"username" : username, "password" : encoded_password})
    isitA = adminCollection.find_one({"username" : username, "password" : encoded_password})
    flag = True if isitHE == isitPE == isitC == isitA == None else False

    if(not flag):
        if(isitA != None):
            token = jwt.encode({"username": isitA['username'], "rol" : rol[0], "name": isitA['name'], "id": isitA['id']}, SK, algorithm="HS256").decode('utf-8')
            return jsonify({"response" : token})
        if(isitC != None):
            token = jwt.encode({"username": isitC['username'], "rol" : rol[1], "name": isitC['name'], "id": isitC['id']}, SK, algorithm="HS256").decode('utf-8')
            return jsonify({"response" :  token})
        if(isitPE != None):
            token = jwt.encode({"username": isitPE['username'], "rol" : rol[2], "name": isitPE['name'], "id" : isitPE['nit']}, SK, algorithm="HS256").decode('utf-8')
            return jsonify({"response" : token})
        if(isitHE != None):
            token = jwt.encode({"username": isitHE['username'], "rol" : rol[3], "name": isitHE['name'], "id" : isitHE['nit']}, SK, algorithm="HS256").decode('utf-8')
            return jsonify({"response" : token})
    else: 
        return jsonify({"response" : "404"})

@app.route("/get/pending", methods=['GET'])
def get_pending():
    pending_PE = establishmentCollection.find({"veredict" : "pending"})
    pending_HE = healthEntityCollection.find({"veredict" : "pending"})
    pending = []
    for i in pending_PE:
        pending.append([i['name'], i['nit'], i['email'], "Establecimiento Público" ,i['category']])
    for i in pending_HE:
        pending.append([i['name'], i['nit'], i['email'], "Entidad de Salud", ""])
    return jsonify({"response" : pending})

@app.route("/accept/pending", methods=['POST'])
def accept_pending():
    req_ = request.json
    nit = req_['NIT']
    healthEntityCollection.update_one({"nit" : nit},{ "$set" : {"veredict" : "accepted"}})
    establishmentCollection.update_one({"nit" : nit},{ "$set" : {"veredict" : "accepted"}})
    return jsonify({"response" : "success"})

@app.route("/reject/pending", methods=['POST'])
def reject_account():
    req_=request.json
    nit = req_['NIT']
    healthEntityCollection.delete_one({"nit" : nit})
    establishmentCollection.delete_one({"nit" : nit})
    return jsonify({"response" : "deleted"})


@app.route("/user-state", methods=["GET", "POST"])
def user_state():
    if request.method == 'GET':
        accounts_PE = establishmentCollection.find({"veredict" : {"$ne" : "pending"} })
        accounts_HE = healthEntityCollection.find({"veredict" : {"$ne" : "pending"} })
        accounts = []
        for i in accounts_PE:
            accounts.append([i['username'] ,i['veredict'] ,i['name'], i['nit'], i['email'], "Establecimiento Público" ,i['category']])
        for i in accounts_HE:
            accounts.append([i['username'] ,i['veredict'] ,i['name'], i['nit'], i['email'], "Entidad de Salud", ""])
        return jsonify({"response" : accounts})
    else:
        req_ = request.json
        nit = req_['NIT']
        username = req_['username']
        veredict = req_['veredict']
        establishmentCollection.update_one({"nit": nit, "username":username}, {"$set" : {"veredict":veredict}})
        healthEntityCollection.update_one({"nit": nit, "username":username}, {"$set" : {"veredict":veredict}})
        return jsonify({"response" : "success"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)


