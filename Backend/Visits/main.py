from flask import Flask, render_template, request, jsonify
import pymongo
from pymongo import MongoClient
import jwt
import datetime
#from userService.constant.constants import SECRET_KEY as SK
#from userService.constant.constants import ROL as rol
from visitsDatabase.collections import db1, db2
from flask_cors import CORS

visitCollection = db1['visitCollection']
citizenCollection = db2['citizenCollection']

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def main():
    return jsonify({"response" : "success"})

@app.route("/visit/manual", methods=["POST"])
def manual_visit():
    req_ = request.json
    id_=req_['id']
    mask=req_['mask']
    temp=req_['temperature']

    covid = "NEGATIVO" #Cambiar cuando se tenga el servicio de pruebas

    flag = True if mask=="SI" and temp<38 and covid=="NEGATIVO" else False

    mask_reason = "No porta tapabocas" if mask == "NO" else ""
    temp_reason = "Temperatura mayor o igual a 38°" if temp >= 38 else ""
    
    citInfo = citizenCollection.find_one({"id" : id_})
    time_ = datetime.datetime.today()

    visitCollection.insert_one({"id" : id_, 
                                "document":citInfo['document'] ,
                                "name" : citInfo['name'],
                                "surname" : citInfo['surname'],
                                "date" : time_, 
                                "gender" : citInfo['gender'],
                                "department" : citInfo['department'],
                                "municipality" : citInfo['municipality'],
                                "neighborhood" : citInfo['neighbourhood'],
                                "address" : citInfo['address'],
                                "entry" : flag,
                                "mask" : mask,
                                "temperature" : temp,
                                "reason" : [mask_reason, temp_reason]
                                })
                              
    return jsonify({"response" : "success"})

@app.route("/visit/untimely", methods=['POST'])
def untimely_visit():
    req_=request.json
    date=req_['date']
    time=req_['time']
    date_time=datetime.datetime.strptime(date + " " + time, '%Y-%m-%d %H:%M')
    req_.pop('date')
    req_.pop('time')
    req_['date_time'] = date_time
    req_['entry'] = True
    req_['reason'] = ["", ""]
    visitCollection.insert_one(req_)
    
    return jsonify({"response": "success"})

    

if __name__ == "__main__":
    app.run(debug=True, port=5200)