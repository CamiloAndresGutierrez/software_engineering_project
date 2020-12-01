from flask import Flask, render_template, request, jsonify
import pymongo
from pymongo import MongoClient
import jwt
#from userService.constant.constants import SECRET_KEY as SK
#from userService.constant.constants import ROL as rol
#from userDatabase.collections import db
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/", methods=["GET"])
def main():
    return jsonify({"response" : "success"})

if __name__ == "__main__":
    app.run(debug=True, port=5100)