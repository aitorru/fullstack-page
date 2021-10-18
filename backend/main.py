from flask import Flask, jsonify
from bson.json_util import dumps
from flask_cors import CORS
from pymongo import MongoClient
import sys

app = Flask(__name__)
CORS(app)
client = None
if len(sys.argv) > 1 and sys.argv[1] == "True":
    # In "production" take the docker internal connection
    # TODO: Get credentials from root file
    client = MongoClient("mongodb://root:example@db:27017/")
else:
    # TODO: Get credentials from root file
    # HowTo: docker run -d -e MONGO_INITDB_ROOT_USERNAME="root" -e MONGO_INITDB_ROOT_PASSWORD="example"  -p 27017:27017 --name MongoDataBase mongo:latest
    client = MongoClient("mongodb://root:example@localhost:27017")
# Select the target db
db = client.newspaper
print(db.name)

# Check if the database is empty ? Populate it : just pass
print(db.news.count_documents({"maxTimeMS": 6000}))
if db.news.count_documents({"maxTimeMS": 6000}) == 0:
    db.news.insert_one(
        {
            "title": "Lorem ipsum",
            "body": "1",
        }
    )
else:
    pass

for items in db.news.find():
    print("")


@app.route("/api/hello")
def hello_world():
    return jsonify(payload="Hola desde flask")


@app.route("/api/news_list")
def newsList():
    cursor = db.news.find()
    list_cur = list(cursor)
    return dumps(list_cur)


if __name__ == "__main__":
    if len(sys.argv) == 1:
        app.run("0.0.0.0", 5000, debug=True)
    elif len(sys.argv) > 1 and sys.argv[1] == "True":
        # This way we run the server in a production mode
        from waitress import serve

        serve(app, host="0.0.0.0", port=5000)
