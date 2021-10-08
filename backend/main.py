from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/api/hello")
def hello_world():
    return jsonify(payload="Hola mundo")


if __name__ == "__main__":
    app.run("0.0.0.0", 5000)
