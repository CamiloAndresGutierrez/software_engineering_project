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

@app.route("/add/document", methods=["POST"])
def add_document():
    req_ = request.json
    name = req_['name']
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
    


if __name__ == "__main__":
    app.run(debug=True, port=5100)