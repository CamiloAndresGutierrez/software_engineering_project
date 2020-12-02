from flask import Flask, render_template, request, jsonify
import pymongo
from pymongo import MongoClient
import jwt
#from userService.constant.constants import SECRET_KEY as SK
#from userService.constant.constants import ROL as rol
from parametersDatabase.collections import db
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

documentCollection = db['documentCollection']
departmentCollection = db['departmentCollection']
municipalityCollection = db['municipalityCollection']
neighborhoodCollection = db['neighborhoodCollection']
categoryCollection = db['categoryCollection']
quarantineCollection = db['quarantineCollection']

@app.route("/add/document", methods=["POST"])
def add_document():
    req_ = request.json
    name = req_['document']
    doc = documentCollection.find_one({"document_name": name})
    if(doc == None):
        documentCollection.insert_one({"document_name": name})
        return jsonify({"response" : "success"})
    else:
        return jsonify({"response" : "failed"})

@app.route("/get/document", methods=["GET"])
def get_document():
    all_ = documentCollection.find()
    document_names = []
    for i in all_:
        document_names.append(i['document_name'])
    return jsonify({"response" : document_names})

@app.route("/delete/document", methods=["POST"])
def delete_document():
    req_= request.json
    name = req_['document']
    doc = documentCollection.delete_one({"document_name":name})
    return jsonify({"response" : "deleted"})

@app.route("/add/department", methods=["POST"])
def add_department():
    req_ = request.json
    name = req_['department']
    cod = req_['code']
    doc = departmentCollection.find_one({"code" : cod})
    if(doc == None):
        departmentCollection.insert_one({"name" : name, "code" : cod})
        return jsonify({"response" : "success"})
    else:
        return jsonify({"response" : "failed"})

@app.route("/get/department", methods=["GET"])
def get_department():
    all_ = departmentCollection.find()
    department_names = []
    for i in all_:
        department_names.append([i['name'], i['code']])
    return jsonify({"response" : department_names})

@app.route("/delete/department", methods=["POST"])
def delete_department():
    req_= request.json
    cod = req_['code']
    print(req_)
    departmentCollection.delete_one({"code": cod })
    return jsonify({"response" : "deleted"})

@app.route("/add/municipality", methods=["POST"])
def add_municipality():
    req_ = request.json
    name = req_['municipality']
    cod = req_['code']
    dep = req_['department']
    doc = municipalityCollection.find_one({"code" : cod, "department" : dep})
    if(doc == None):
        municipalityCollection.insert_one({"name" : name, "code" : cod, "department" : dep})
        return jsonify({"response" : "success"})
    else:
        return jsonify({"response" : "failed"})

@app.route("/get/municipality", methods=["GET"])
def get_municipality():
    all_ = municipalityCollection.find()
    department_names = []
    for i in all_:
        department_names.append([i['name'], i['code'], i['department']])
    return jsonify({"response" : department_names})

@app.route("/delete/municipality", methods=["POST"])
def delete_municipality():
    req_= request.json
    cod = req_['code']
    dep = req_['department']
    municipalityCollection.delete_one({"code":cod, "department" : dep})
    return jsonify({"response" : "deleted"})


@app.route("/add/neighborhood", methods=["POST"])
def add_neighborhood():
    req_ = request.json
    name = req_['neighborhood']
    doc = neighborhoodCollection.find_one({"neighborhood" : name})
    if(doc == None):
        neighborhoodCollection.insert_one({"neighborhood" : name})
        return jsonify({"response" : "success"})
    else:
        return jsonify({"response" : "failed"})

@app.route("/get/neighborhood", methods=["GET"])
def get_neighborhood():
    all_ = neighborhoodCollection.find()
    department_names = []
    for i in all_:
        department_names.append(i['neighborhood'])
    return jsonify({"response" : department_names})

@app.route("/delete/neighborhood", methods=["POST"])
def delete_neighborhood():
    req_= request.json
    name = req_['neighborhood']
    neighborhoodCollection.delete_one({"neighborhood" : name})
    return jsonify({"response" : "deleted"})

@app.route("/add/category", methods=["POST"])
def add_category():
    req_ = request.json
    name = req_['category']
    doc = categoryCollection.find_one({"name" : name})
    if(doc == None):
        categoryCollection.insert_one({"name" : name})
        return jsonify({"response" : "success"})
    else:
        return jsonify({"response" : "failed"})

@app.route("/get/category", methods=["GET"])
def get_category():
    all_ = categoryCollection.find()
    category_names = []
    for i in all_:
        category_names.append(i['name'])
    return jsonify({"response" : category_names})

@app.route("/delete/category", methods=["POST"])
def delete_category():
    req_= request.json
    id_=req_['category']
    categoryCollection.delete_one({"name" : id_})
    return jsonify({"response" : "deleted"})

@app.route("/quarantine", methods=["GET", "POST"])
def set_quarantine():
    if(request.method == "GET"):
        days = quarantineCollection.find()
        aux = 0
        for i in days:
            aux = i['days']
        return jsonify({"response": aux})
    else: 
        req_=request.json
        days = req_['days']
        print(days)
        q = quarantineCollection.find()
        if(q == None):
            quarantineCollection.insert_one({"days": days})
        else:
            quarantineCollection.delete_many({})
            quarantineCollection.insert_one({"days": days})
        return jsonify({"response": "success"})

if __name__ == "__main__":
    app.run(debug=True, port=5100)