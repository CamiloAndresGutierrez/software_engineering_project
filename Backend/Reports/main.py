from flask import Flask, render_template, request, jsonify
import pymongo
from pymongo import MongoClient
import jwt
from reportsService.constant.constants import SECRET_KEY as SK
from reportsService.constant.constants import ROL as rol
from reportsDatabase.collections import db1, db2, db3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

testCollection=db1['testCollection']

citizenCollection=db2['citizenCollection']
healthEntityCollection=db2['healthEntityCollection']
establishmentCollection=db2['establishmentCollection']

visitCollection=db3['visitCollection']

@app.route('/report/tests', methods=['GET'])
def testReports():
    testReport = testCollection.find()
    generatedReport=[]
    for i in testReport:
        date_time=str(i['date_time']).split()
        generatedReport.append([i['id'], i['document'], i['nit'], i['HE_name'] , date_time[0], date_time[1]])

    return jsonify({"response":generatedReport})

@app.route('/report/visit', methods=['GET'])
def visitsReport():
    visitReport=visitCollection.find()

    generatedReport=[]
    for i in visitReport:
        date_time=str(i['date']).split()
        entry="Aprobado" if i['entry'] else "Rechazado"
        generatedReport.append([i['id'], i['document'], i['name'] + " " + i['surname'], i['gender'], entry, i['reason'], i['establishment_name'], i['nit'], i['category'] ,date_time[0], date_time[1]])

    return jsonify({"response":generatedReport})

@app.route('/report/citizen', methods=['GET'])
def citizenReports():
    citizenReports=citizenCollection.find()

    generatedReport=[]
    for i in citizenReports:
        generatedReport.append([i['id'], i['document'], i['name'] + " " + i['surname'], i['gender'], i['department'], i['municipality'], i['neighbourhood'], i['address']])

    return jsonify({"response":generatedReport})

@app.route('/report/establishment', methods=['GET'])
def establishmentReports():
    establishmentReport=establishmentCollection.find()

    generatedReport=[]
    for i in establishmentReport:
        generatedReport.append([i['nit'], i['name'], i['phone'], i['email'], i['address'], i['departments'], i['municipality'], i['neighborhood'], i['category']])

    return jsonify({"response":generatedReport})

@app.route('/report/health-entity', methods=['GET'])
def healthEreports():
    healthEreport=healthEntityCollection.find()

    generatedReport=[]
    for i in healthEreport:
        generatedReport.append([i['nit'], i['name'], i['phone'], i['email'], i['address'], i['department'], i['municipality'], i['neighborhood']])

    return jsonify({"response":generatedReport})



if __name__ == "__main__":
    app.run(debug=True, port=5400)