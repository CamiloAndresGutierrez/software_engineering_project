from flask import Flask, render_template, request, jsonify
import pymongo
from pymongo import MongoClient
import jwt
import datetime
from datetime import timedelta
from visitsService.constants.constants import SECRET_KEY as SK
#from userService.constant.constants import ROL as rol
from visitsDatabase.collections import db1, db2, db3, db4
from flask_cors import CORS

visitCollection = db1['visitCollection']
citizenCollection = db2['citizenCollection']
testCollection = db3['testCollection']
quarantineCollection = db4['quarantineCollection']

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def main():
    return jsonify({"response" : "success"})

@app.route("/visit/manual", methods=["POST"])
def manual_visit():
    req_ = request.json
    id_=req_['id']
    doc=req_['document']
    mask=req_['mask']
    temp=req_['temperature']
    print(req_)
    quarantine = "NEGATIVO" #Cambiar cuando se tenga el servicio de pruebas

    tested_citizen=testCollection.find({"id":id_,"document":doc})
    for i in tested_citizen:
        q=0
        aux=quarantineCollection.find()
        tst=jwt.decode(i['state'], SK, algorithms="HS256")
        if(tst['state']!="Negativo"):
            for j in aux:
                q=j['days']
            set_quarantine = i['date_time'] + timedelta(days=q)
            if  i['date_time'] < datetime.datetime.now() < set_quarantine:
                quarantine = "POSITIVO"
                break
            else:
                quarantine = "NEGATIVO"

 
    flag = True if mask=="SI" and temp<38 and quarantine=="NEGATIVO" else False

    mask_reason = "No porta tapabocas" if mask == "NO" else ""
    temp_reason = "Temperatura mayor o igual a 38°" if temp >= 38 else ""
    
    citInfo = citizenCollection.find_one({"id" : id_, "document":doc})
    time_ = datetime.datetime.today()

    if citInfo != None:
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
                                    "reason" : [mask_reason, temp_reason],
                                    "nit":req_['nit'],
                                    "establishment_name" : req_['establishment_name'],
                                    "category" : req_['establishment_category']
                                    })
        if flag:                  
            return jsonify({"response" : "success"})
        else:
            return jsonify({"response" : "entry_failed"})
    else:
        return jsonify({"response" : "failed"})

@app.route("/visit/untimely", methods=['POST'])
def untimely_visit():
    req_=request.json
    date=req_['date']
    time=req_['time']
    entry=req_['entry']
    req_.pop('date')
    req_.pop('time')
    mask=req_['mask']
    temp=req_['temperature']
    
    mask_reason = "No porta tapabocas" if mask == "NO" else ""
    temp_reason = "Temperatura mayor o igual a 38°" if temp >= 38 else ""
    date_time=datetime.datetime.strptime(date + " " + time, '%Y-%m-%d %H:%M')
    req_['reason'] = [mask_reason, temp_reason]
    req_['date'] = date_time
    if(entry == "Aceptado"):
        req_['entry']=True
    else:
        req_['entry']=False
    
    visitCollection.insert_one(req_)
    
    return jsonify({"response": "success"})

@app.route("/citizen/visit", methods=['POST'])
def citizen_visit():
    req_=request.json
    id_=req_['id']
    doc=req_['document']
    visit=visitCollection.find({"id" : id_, "document" : doc})
    establishments_info=[]
    for i in visit:
        date_time= str(i['date']).split()
        entry="Aprobado" if i['entry'] else "Rechazado"
        establishments_info.append([i['nit'], i['establishment_name'], i['category'], date_time[0], date_time[1], entry, i['reason']])
    return jsonify({"response" : establishments_info})

@app.route("/establishment/visit", methods=['POST'])
def est_visit():
    req_=request.json
    nit=req_['nit']
    visit=visitCollection.find({"nit" : nit})
    establishments_info=[]
    for i in visit:
        date_time= str(i['date']).split()
        entry="Aprobado" if i['entry'] else "Rechazado"
        establishments_info.append([i['document'], i['id'], i['name'] + " " + i['surname'], i['gender'], i['department'] ,i['municipality'] ,date_time[0], date_time[1], entry, i['reason']])
    return jsonify({"response" : establishments_info})


if __name__ == "__main__":
    app.run(debug=True, port=5200)