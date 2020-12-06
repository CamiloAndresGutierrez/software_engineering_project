from flask import Flask, render_template, request, jsonify
import pymongo
from pymongo import MongoClient
import jwt
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

def first_admin():
    """
    Esta función crea el primer admin del sistema.
    """
    id_=1144210801
    doc="CC"

    valid_username_Admin=adminCollection.find_one({"username": "MainAdminUser"})
    valid_id = adminCollection.find_one({"id" : id_, "document" : doc})

    flag = True if valid_id == valid_username_Admin == None else False

    if(flag):
        encoded_password = jwt.encode({"password":"1234admin1234"}, SK, algorithm="HS256").decode('utf-8')
        adminCollection.insert_one({"name":"Admin", "surname": "", "username": "MainAdminUser", "password" : encoded_password, "document" : doc ,"id" : id_ })
        return "success"
    else:
        return "failed"


@app.route("/login", methods=["GET"])
def main():
    return jsonify({"response": "Hola desde back"})

@app.route("/registration/establishment", methods=['POST'])
def estRegistration():
    """
    Esta función permite el registro de establecimientos públicos en el sistema.
    """
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
    
    valid_username_PE = establishmentCollection.find_one({"username" : username})
    valid_username_HE = healthEntityCollection.find_one({"username" : username})
    valid_username_cit = citizenCollection.find_one({"username" : username})
    valid_username_Admin = adminCollection.find_one({"username" : username})

    valid_id = establishmentCollection.find_one({"nit" : nit})

    flag = True if valid_username_HE == valid_username_PE == valid_username_cit == valid_username_Admin == None else False
    flag2 = True if valid_id == None else False
    
    if(flag):
        if(not flag2):
            return {"response" : "failed"}
        else:
            establishmentCollection.insert_one({"veredict": "pending","nit":nit, "name": name, "phone" : [phone], "email" : email, "username": username, "password":encoded_password, "address" : address, "departments" : dep, "municipality" : mun, "neighborhood" : ngh, "category" : cat})
            return {"response" : "success"}
    else:
        return {"response":"username_failed"}

@app.route("/registration/citizen", methods=["POST"])
def citRegistration():
    """
    Esta función permite el registro de ciudadanos en el sistema.
    """
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
    
   
    valid_username_PE = establishmentCollection.find_one({"username" : username})
    valid_username_HE = healthEntityCollection.find_one({"username" : username})
    valid_username_cit = citizenCollection.find_one({"username" : username})
    valid_username_Admin = adminCollection.find_one({"username" : username})

    valid_id = citizenCollection.find_one({"id" : id_, "document" : doc})
    
    flag = True if valid_username_HE == valid_username_PE == valid_username_cit == valid_username_Admin == None else False
    flag2 = True if valid_id == None else False

    if(flag):
        if(not flag2):
            return {"response" : "failed"}
        else:
            citizenCollection.insert_one({"name":name, "surname": surname, "username":username, "password" : encoded_password, "gender": gender, "document" : doc ,"id" : id_, "department" : dep , "municipality" : mun , "neighbourhood" : ngh , "address": address})
            return {"response" : "success"} 
    else:
        return {"response":"username_failed"}

@app.route("/registration/healthEntity", methods=["POST"])
def healthEntityRegistration():
    """
    Esta función permite el registro de entidades de salud en el sistema.
    """
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
        
    valid_username_PE = establishmentCollection.find_one({"username" : username})
    valid_username_HE = healthEntityCollection.find_one({"username" : username})
    valid_username_cit = citizenCollection.find_one({"username" : username})
    valid_username_Admin = adminCollection.find_one({"username" : username})

    valid_id = healthEntityCollection.find_one({"nit" : nit})

    flag = True if valid_username_HE == valid_username_PE == valid_username_cit == valid_username_Admin == None else False
    flag2 = True if valid_id == None else False

    if(flag):
        if(not flag2):
            return {"response" : "failed"}
        else:
            healthEntityCollection.insert_one({"veredict": "pending","nit":nit, "name": name, "phone" : [phone], "email" : email, "username": username, "password":encoded_password, "address" : address, "department" : dep, "municipality": mun, "neighborhood": ngh})
            return {"response" : "success"} 
    else:
        return {"response":"username_failed"}

@app.route("/add/admin", methods=["POST"])
def add_admin():
    """
    Esta función permite que un administrador pueda agregar a otro administrador.
    """
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

    valid_id = adminCollection.find_one({"id" : id_, "document" : doc})
    
    flag = True if valid_username_HE == valid_username_PE == valid_username_cit == valid_username_Admin == None else False
    flag2 = True if valid_id == None else False

    if(flag):
        if(not flag2):
            return {"response" : "failed"}
        else:
            adminCollection.insert_one({"name":name, "surname": surname, "username":username, "password" : encoded_password, "document" : doc ,"id" : id_ })
            return {"response" : "success"} 
    else:
        return {"response":"username_failed"}

@app.route("/login", methods=["POST"])
def login():
    """
    Esta función permite realizar el login del usuario a través del username y contraseña
    """
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
            token = jwt.encode({"username": isitA['username'], "rol" : rol[0], "category" : "" ,"name": isitA['name'], "id": isitA['id'], "document" : isitA['document']}, SK, algorithm="HS256").decode('utf-8')
            return jsonify({"response" : token})
        if(isitC != None):
            token = jwt.encode({"username": isitC['username'], "rol" : rol[1], "category" : "" ,"name": isitC['name'], "id": isitC['id'], "document" : isitC['document']}, SK, algorithm="HS256").decode('utf-8')
            return jsonify({"response" :  token})
        if(isitPE != None):
            token = jwt.encode({"username": isitPE['username'], "rol" : rol[2], "category" : isitPE['category'] ,"name": isitPE['name'], "id" : isitPE['nit'], "document" : "NIT"}, SK, algorithm="HS256").decode('utf-8')
            return jsonify({"response" : token})
        if(isitHE != None):
            token = jwt.encode({"username": isitHE['username'], "rol" : rol[3], "category" : "" ,"name": isitHE['name'], "id" : isitHE['nit'], "document" : "NIT"}, SK, algorithm="HS256").decode('utf-8')
            return jsonify({"response" : token})
    else: 
        return jsonify({"response" : "404"})

@app.route("/get/pending", methods=['GET'])
def get_pending():
    """
    Esta función permite ver al administrador cuáles entidades de salud o establecimientos están pendientes por aprobación.
    """
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
    """
    Esta función permite aceptar el registro de establecimiento públicos o entidades de salud en el sistema.
    """
    req_ = request.json
    nit = req_['NIT']
    healthEntityCollection.update_one({"nit" : nit},{ "$set" : {"veredict" : "accepted"}})
    establishmentCollection.update_one({"nit" : nit},{ "$set" : {"veredict" : "accepted"}})
    return jsonify({"response" : "success"})

@app.route("/reject/pending", methods=['POST'])
def reject_account():
    """
    Esta función permite rechazar y borrar el registro de establecimiento públicos o entidades de salud en el sistema.
    """
    req_=request.json
    nit = req_['NIT']
    healthEntityCollection.delete_one({"nit" : nit})
    establishmentCollection.delete_one({"nit" : nit})
    return jsonify({"response" : "deleted"})


@app.route("/user-state", methods=["GET", "POST"])
def user_state():
    """
    Esta función permite a través del método GET, revisar las entidades o establecimientos que se pueden deshabilitar o habilitar
    Y a través del método POST, cambiar el estado de deshabilitado a habilitado y viceversa
    """
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

@app.route("/modify-info/establishment", methods=['POST'])
def modifyEstablishmentInfo():
    """
    Esta función permite modificar la información de un establecimiento público
    """
    req_=request.json
    nit=req_['NIT']

    est_info = establishmentCollection.find_one({"nit" : nit})
    
    name= est_info['name'] if req_['name'] == "" else req_['name']
    phone= est_info['phone'] if req_['phone'] == "" else [req_['phone']]
    email=est_info['email'] if req_['email'] == "" else req_['email']
    encoded_pass=jwt.encode({"password" : req_['password']}, SK, algorithm="HS256").decode('utf-8')
    password=est_info['password'] if req_['password'] == "" else encoded_pass
    category=est_info['category'] if req_['category'] == "" else req_['category']
    departments=est_info['departments'] if req_['departments'] == "" else req_['departments']
    municipality=est_info['municipality'] if req_['municipality'] == "" else req_['municipality']
    neighborhood=est_info['neighborhood'] if req_['neighborhood'] == "" else req_['neighborhood']
    address=est_info['address'] if req_['address'] == "" else req_['address']
  
    establishmentCollection.update_one({"nit" : nit}, { "$set" :{"name" : name,"password":password ,"phone" : phone, "email" : email, "category":category, "departments" : departments, 'municipality':municipality,'neighborhood':neighborhood,'address':address}})

    return jsonify({"response" : "success"})

@app.route("/modify-info/citizen", methods=['POST'])
def modifyCitizenInfo():
    """
    Esta función permite modificar la información de un ciduadano
    """
    req_=request.json
    id_=req_['id']
    doc=req_['document']

    cit_info=citizenCollection.find_one({"id":id_, "document":doc})

    name=cit_info['name'] if req_['name']  == "" else req_['name']
    surname=cit_info['surname'] if req_['surname']  == "" else req_['surname']
    encoded_pass=jwt.encode({"password" : req_['password']}, SK, algorithm="HS256").decode('utf-8')
    password=cit_info['password'] if req_['password']  == "" else encoded_pass
    gender=cit_info['gender'] if req_['gender'] == ""  else req_['gender']
    department=cit_info['department'] if req_['department'] == "" else req_['department']
    municipality=cit_info['municipality'] if req_['municipality']  == "" else req_['municipality']
    neighborhood=cit_info['neighbourhood'] if req_['neighbourhood']  == "" else req_['neighbourhood']
    address=cit_info['address'] if req_['address'] == ""  else req_['address']

    citizenCollection.update_one({"id":id_, "document":doc}, {"$set" :{"name" : name, "surname" : surname, "password" : password, "gender" : gender, "department" : department, "municipality" : municipality, "neighbourhood" : neighborhood, "address" : address, }})
    
    return jsonify({"response":"success"})

@app.route("/modify-info/health-entity", methods=['POST'])
def modifyHealthEntityInfo():
    """
    Esta función permite modificar la información de una entidad de salud
    """
    req_=request.json
    nit=req_['NIT']

    he_info = healthEntityCollection.find_one({"nit" : nit})
    
    name= he_info['name'] if req_['name'] == "" else req_['name']
    phone= he_info['phone'] if req_['phone'] == "" else [req_['phone']]
    email=he_info['email'] if req_['email'] == "" else req_['email']
    encoded_pass=jwt.encode({"password" : req_['password']}, SK, algorithm="HS256").decode('utf-8')
    password=he_info['password'] if req_['password'] == "" else encoded_pass
    
    departments=he_info['department'] if req_['department'] == "" else req_['department']
    municipality=he_info['municipality'] if req_['municipality'] == "" else req_['municipality']
    neighborhood=he_info['neighborhood'] if req_['neighborhood'] == "" else req_['neighborhood']
    address=he_info['address'] if req_['address'] == "" else req_['address']
  
    healthEntityCollection.update_one({"nit" : nit}, { "$set" :{"name" : name, "phone" : phone, "email" : email, "department" : departments, 'municipality':municipality,'neighborhood':neighborhood,'address':address, "password":password}})

    return jsonify({"response" : "success"})

@app.route("/modify-info/admin", methods=['POST'])
def modifyAdminInfo():
    """
    Esta función permite modificar la información de un administrador
    """
    req_=request.json
    id_=req_['id']
    doc=req_['document']

    admin_info=adminCollection.find_one({"id":id_,"document":doc})

    name=admin_info['name'] if req_['name']  == "" else req_['name']
    surname=admin_info['surname'] if req_['surname']  == "" else req_['surname']
    encoded_pass=jwt.encode({"password" : req_['password']}, SK, algorithm="HS256").decode('utf-8')
    password=admin_info['password'] if req_['password']  == "" else encoded_pass

    adminCollection.update_one({"id":id_, "document":doc}, {"$set":{"name": name, "surname":surname, "password":password}})


    return jsonify({"response" : "success"})
    
if __name__ == "__main__":
    print(first_admin())
    
    app.run(debug=True, port=5000)