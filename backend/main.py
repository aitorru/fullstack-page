from flask import Flask, jsonify
from bson.json_util import dumps
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
import urllib.request
from flask import request
import sys

import pymongo

app = Flask(__name__)
CORS(app)
client = None
if len(sys.argv) > 1 and sys.argv[1] == "True":
    # In "production" take the docker internal connection
    # TODO: Get credentials from root file
    urllib.request.urlopen("http://scheduler/scheduler/")
    client = MongoClient("mongodb://root:example@db:27017/")
else:
    # TODO: Get credentials from root file
    # HowTo: docker run -d -e MONGO_INITDB_ROOT_USERNAME="root" -e MONGO_INITDB_ROOT_PASSWORD="example"  -p 27017:27017 --name MongoDataBase mongo:latest
    client = MongoClient("mongodb://root:example@localhost:27017")
# Select the target db
db = client.newspaper


@app.route("/api/hello")
def hello_world():
    return jsonify(payload="Hola desde flask")


@app.route("/api/news_list_limit_10")
def newsListLimit():
    # TODO: Sort the response by the layout order.
    cursor = db.news.find({}, limit=15).sort("_id", pymongo.DESCENDING)
    list_cur = list(cursor)
    # Inverse the array
    return dumps(list_cur[::-1])


@app.route("/api/news_list")
def newsList():
    # TODO: Sort the response by the layout order.
    if request.headers.get("query", type=str) == "":
        cursor = db.news.find({})
        list_cur = list(cursor)
        return dumps(list_cur)
    else:
        cursor = db.news.find(
            {"$text": {"$search": request.headers.get("query", type=str)}}
        )
        list_cur = list(cursor)
        return dumps(list_cur)


@app.route("/api/get_categories")
def categories():
    cursor = db.category.find({})
    list_cur = list(cursor)
    return dumps(list_cur)


@app.route("/api/post/<id>")
def getPostByID(id):
    cursor = db.news.find_one({"_id": ObjectId(id)})
    return dumps(cursor)


if __name__ == "__main__":
    if len(sys.argv) == 1:
        app.run("0.0.0.0", 5000, debug=True)
    elif len(sys.argv) > 1 and sys.argv[1] == "True":
        # This way we run the server in a production mode
        from waitress import serve

        serve(app, host="0.0.0.0", port=80)
