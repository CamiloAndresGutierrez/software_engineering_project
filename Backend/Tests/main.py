from flask import Flask, render_template, request, jsonify
import pymongo
from pymongo import MongoClient
import jwt
from testsService.constants import SECRET_KEY as SK
from testsService.constants import ROL as rol
from testsDatabase.collections import db
from flask_cors import CORS
import datetime

testCollection = db['testCollection']

app = Flask(__name__)
CORS(app)

@app.route("/add/test", methods=['POST'])
def add_test():
    """
    Esta función permite agregar pruebas por COVID-19 realizadas a ciudadanos.
    """
    req_=request.json
    time=req_['time']
    date=req_['date']
    date_time=datetime.datetime.strptime(date + " " + time, '%Y-%m-%d %H:%M')
    state=jwt.encode({"state" : "Pendiente"}, SK, algorithm="HS256").decode('utf-8')
    testCollection.insert_one({"id" : req_['id'], "document" : req_['document'], "date_time" : date_time, "nit" : req_['nit'], "HE_name" : req_['HE_name'] , "state" : state})

    return jsonify({"response" : "success"})

@app.route("/get/test/citizen", methods=['POST'])
def get_test():
    """
    Esta función permite revisar las pruebas por COVID-19 realizadas al ciudadano que ha ingresado al sistema.
    """
    req_=request.json
    id_=req_['id']
    doc=req_['document']
    citizen_tests = testCollection.find({"id" : id_, "document" : doc})

    user_test=[]
    for i in citizen_tests:
        date_time=str(i['date_time']).split()
        state=jwt.decode(i['state'], SK, algorithms="HS256")
        user_test.append([i['HE_name'],date_time[0], date_time[1] , state['state']])
    
    return jsonify({"response" : user_test})

@app.route("/get/test/health-entity", methods=['POST'])
def get_test_HE():
    """
    Esta función permite revisar las pruebas por COVID-19 realizadas en la entidad de salud que ha ingresado al sistema.
    """
    req_=request.json
    nit=req_['nit']

    HE_tests = testCollection.find({"nit" : nit})

    HE_test_result=[]
    for i in HE_tests:
        date_time=str(i['date_time']).split()
        state=jwt.decode(i['state'], SK, algorithms="HS256")
        HE_test_result.append([i['id'],i['document'],i['HE_name'],date_time[0], date_time[1] , state['state']])
    
    return jsonify({"response" : HE_test_result})
    

@app.route("/modify/test", methods=['POST'])
def modify_test():
    """
    Esta función permite modificar el estado de la prueba por COVID-19, de Pendiente a Positiva o Negativa.
    """
    req_=request.json
    id_=req_['id']
    doc=req_['document']
    date=req_['date']
    time=req_['time']
    state=req_['state']

    state=jwt.encode({"state" : state}, SK, algorithm="HS256").decode('utf-8')

    date_time=datetime.datetime.strptime(date + " " + time, '%Y-%m-%d %H:%M:%S')

    test=testCollection.update_one({"id":id_, "document":doc, "date_time":date_time}, {"$set" : {"state" : state}})

    return jsonify({"response" : "success"})


if __name__ == "__main__":
    app.run(debug=True, port=5300)