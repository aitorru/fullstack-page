from flask import Flask, jsonify
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
    client = MongoClient("mongodb://root:example@localhost:27017")


@app.route("/api/hello")
def hello_world():
    return jsonify(payload="Hola desde flask")


if __name__ == "__main__":
    if len(sys.argv) == 1:
        app.run("0.0.0.0", 5000, debug=True)
    elif len(sys.argv) > 1 and sys.argv[1] == "True":
        # This way we run the server in a production mode
        from waitress import serve

        serve(app, host="0.0.0.0", port=5000)
