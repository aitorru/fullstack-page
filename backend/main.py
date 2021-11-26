from flask import Flask, jsonify
from bson.json_util import dumps
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
import urllib.request
from flask import request, Flask, redirect, make_response
import sys
import bcrypt
import pymongo
from dotenv import load_dotenv
import os
from flask_jwt_extended import (
    JWTManager,
    jwt_required,
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
    unset_jwt_cookies,
    unset_access_cookies,
)

# Load .env file
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
# https://dev.to/totally_chase/python-using-jwt-in-cookies-with-a-flask-app-and-restful-api-2p75
app.config["BASE_URL"] = ""  # Running on localhost TODO: Change in production
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET")  # Change this!
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_COOKIE_CSRF_PROTECT"] = True
app.config["JWT_CSRF_CHECK_FORM"] = True
jwt = JWTManager(app)
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

# Assing tokens
def assign_access_refresh_tokens(user_id):
    access_token = create_access_token(identity=str(user_id))
    refresh_token = create_refresh_token(identity=str(user_id))
    resp = make_response("ok")
    set_access_cookies(resp, access_token)
    set_refresh_cookies(resp, refresh_token)
    return resp


# Unset tokens
def unset_jwt():
    resp = make_response(redirect(app.config["BASE_URL"] + "/", 302))
    unset_jwt_cookies(resp)
    return resp


@jwt.unauthorized_loader
def unauthorized_callback():
    # No auth header
    return redirect("/login", 302)


@jwt.invalid_token_loader
def invalid_token_callback():
    # Invalid Fresh/Non-Fresh Access token in auth header
    resp = make_response(redirect("/login"))
    unset_jwt_cookies(resp)
    return resp, 302


@jwt.expired_token_loader
def expired_token_callback():
    # Expired auth header
    resp = make_response(redirect(app.config["BASE_URL"] + "/token/refresh"))
    unset_access_cookies(resp)
    return resp, 302


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


@app.route("/api/register", methods=["POST"])
def register():
    json = request.json
    salt = bcrypt.gensalt()
    db.users.insert_one(
        {
            "username": json["username"],
            "password": bcrypt.hashpw(json["password"].encode(), salt).decode(),
        }
    )
    return assign_access_refresh_tokens(json["username"])


@app.route("/api/login", methods=["POST"])
def login():
    json = request.json
    print(json)
    cursor = db.users.find({"username": json["username"]})
    count = db.users.count_documents({"username": json["username"]})
    if count == 0:
        return "Username not found", 400
    else:
        for doc in cursor:
            passwordH = doc["password"]
            if bcrypt.checkpw(json["password"].encode(), passwordH.encode()):
                return assign_access_refresh_tokens(json["username"])
    return "pass"


@app.route("/api/is_logged_in")
@jwt_required()
def isLoggedIn():
    return jsonify(loggedIn=True)


if __name__ == "__main__":
    if len(sys.argv) == 1:
        app.run("0.0.0.0", 5000, debug=True)
    elif len(sys.argv) > 1 and sys.argv[1] == "True":
        # This way we run the server in a production mode
        from waitress import serve

        serve(app, host="0.0.0.0", port=80)
