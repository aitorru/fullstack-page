import json
from flask import Flask, jsonify, Blueprint, render_template
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
from datetime import timedelta
from flask_restx import Resource, Api, apidoc
from flask_jwt_extended import (
    JWTManager,
    jwt_required,
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
    unset_jwt_cookies,
    unset_access_cookies,
    get_jwt_identity,
)
from werkzeug.wrappers import response

# Load .env file
# TODO: Read from envs that gets passed from docker
load_dotenv()

app = Flask(__name__)
blueprint = Blueprint("api", __name__, url_prefix="/api")
api = Api(blueprint, doc="/doc/", specs_url="/api", static_url_path="/api/swaggerui")
app.register_blueprint(blueprint)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
# https://dev.to/totally_chase/python-using-jwt-in-cookies-with-a-flask-app-and-restful-api-2p75
app.config["BASE_URL"] = ""  # Running on localhost TODO: Change in production
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET")  # Change this!
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]
app.config["JWT_COOKIE_CSRF_PROTECT"] = True
app.config["JWT_CSRF_CHECK_FORM"] = True
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = timedelta(days=30)
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

# only when running on aks
@apidoc.apidoc.add_app_template_global
def swagger_static(filename):
    print(filename)
    return "{0}/swaggerui/{1}".format("/api", filename)


# only when running on aks
@api.documentation
def custom_ui():
    return render_template(
        "swagger-ui.html", title=api.title, specs_url="{}/swagger.json".format("/api")
    )


# Assing tokens
def assign_access_refresh_tokens(user_id):
    access_token = create_access_token(identity=str(user_id))
    refresh_token = create_refresh_token(identity=str(user_id))
    resp = make_response(jsonify(payload="ok"))
    set_access_cookies(resp, access_token)
    set_refresh_cookies(resp, refresh_token)
    return resp


# Unset tokens
def unset_jwt():
    resp = make_response(jsonify(payload="ok"))
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
    resp = make_response(redirect("/login"))
    unset_access_cookies(resp)
    return resp, 302


@api.route("/news_list_limit_10")
class NewsListLimit(Resource):
    @api.doc(responses={200: "15 top news"})
    def get(self):
        cursor = db.news.find({}, limit=15).sort("_id", pymongo.DESCENDING)
        list_cur = list(cursor)
        # Inverse the array
        return json.loads(dumps(list_cur[::-1]))


parser = api.parser()
parser.add_argument("query", location="headers")


@api.route("/news_list")
@api.expect(parser)
class NewsList(Resource):
    @api.doc(
        responses={
            200: "If query header is not present or set to '' it send back all the news. Otherwise it looks up the query and returns matching text."
        }
    )
    def get(self):
        # TODO: Sort the response by the layout order.
        if (
            request.headers.get("query", type=str) == ""
            or request.headers.get("query", type=str) == None
        ):
            cursor = db.news.find({})
            list_cur = list(cursor)
            return json.loads(dumps(list_cur))
        else:
            cursor = db.news.find(
                {"$text": {"$search": request.headers.get("query", type=str)}}
            )
            list_cur = list(cursor)
            return json.loads(dumps(list_cur))


@api.route("/get_categories")
class Categories(Resource):
    @api.doc(responses={200: "Get all categories"})
    def get(self):
        cursor = db.category.find({})
        list_cur = list(cursor)
        return json.loads(dumps(list_cur))


@api.route("/post/<string:id>")
class PostById(Resource):
    @api.doc(responses={200: "Return the post with the id specified"})
    def get(self, id):
        cursor = db.news.find_one({"_id": ObjectId(id)})
        return json.loads(dumps(cursor))


@app.route("/api/post/<id>")
def getPostByID(id):
    cursor = db.news.find_one({"_id": ObjectId(id)})
    return dumps(cursor)


@app.route("/api/comments/<id>")
def getCommentsByPostID(id):
    cursor = db.comments.find({"postId": id})
    return dumps(cursor)


@app.route("/api/comment", methods=["POST"])
@jwt_required()
def postComment():
    json = request.json
    db.comments.insert_one(
        {
            "username": get_jwt_identity(),
            "postId": json["postId"],
            "comment": json["comment"],
        }
    )
    return jsonify(payload="Done")


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


@app.route("/api/user")
@jwt_required(optional=True, refresh=True)
def isLoggedIn():
    username = get_jwt_identity()
    if username == None:
        return jsonify(loggedIn=False)
    return jsonify(loggedIn=True, username=username)


@app.route("/api/logout")
@jwt_required(refresh=True)
def logout():
    return unset_jwt()


if __name__ == "__main__":
    if len(sys.argv) == 1:
        app.run("0.0.0.0", 5000, debug=True, threaded=True)
    elif len(sys.argv) > 1 and sys.argv[1] == "True":
        # This way we run the server in a production mode
        from waitress import serve

        serve(app, host="0.0.0.0", port=80, threads=8)
