from flask import Flask, jsonify
from bson.json_util import dumps
from flask_cors import CORS
from pymongo import MongoClient
from bson.objectid import ObjectId
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
if db.news.count_documents({}) == 0:
    db.news.insert_one(
        {
            "title": "El primero",
            "body": "1",
        }
    )
    db.news.insert_one(
        {
            "title": "Este es el 2",
            "body": "2",
        }
    )
    db.news.insert_one(
        {
            "title": "Lorem ipsum",
            "body": "3",
        }
    )
    db.news.insert_one(
        {
            "title": "Lorem ipsum",
            "body": "4",
        }
    )
    db.news.insert_one(
        {
            "title": "Teoricamente este es el 5",
            "body": "5",
        }
    )
    db.news.insert_one(
        {
            "title": "Entonces este es el 6",
            "body": """
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam aliquet ex et justo faucibus, sit amet eleifend est laoreet. Sed eget quam laoreet, lobortis mi et, mollis dui. Vestibulum a egestas ante. Nunc commodo sodales risus id rutrum. Aliquam auctor mi eu suscipit maximus. Etiam bibendum consectetur convallis. Maecenas ut orci rhoncus, finibus est ac, lobortis arcu. Curabitur sagittis dapibus eros. Praesent hendrerit neque in tempus tempus. Sed faucibus magna sed tellus finibus, id viverra justo condimentum. Duis sagittis orci sed tellus vulputate, id laoreet elit pretium. Vivamus gravida nisi commodo mi tristique faucibus. Sed tempus odio ac lacus maximus, id pretium ante ornare.

Proin vitae aliquet nisi, nec rhoncus risus. Quisque pulvinar turpis vel mattis tincidunt. Vestibulum a tincidunt diam. Quisque nec ante congue, rhoncus sem auctor, molestie nibh. Morbi pharetra, libero sed fringilla semper, lectus sapien cursus elit, sed pellentesque metus tortor sed nisi. Curabitur posuere lorem justo, ac porta odio rhoncus eget. Mauris sodales felis a purus malesuada, non feugiat erat facilisis. Sed consequat sapien augue, et tristique purus fermentum pharetra. Ut consectetur ut orci et finibus. Fusce faucibus nisl eu quam interdum molestie. Aliquam erat volutpat. Nulla in ornare libero.

Sed efficitur orci vel sem consequat, vitae semper magna dapibus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin eu odio egestas, fermentum urna sed, mattis enim. Proin nec sollicitudin diam. Donec eget nibh at dolor condimentum volutpat quis non leo. Sed sagittis diam tellus, in fermentum odio fringilla sit amet. Nulla non mi placerat, ultricies enim et, bibendum neque. Mauris fringilla rhoncus eleifend. Curabitur at blandit nisi. Praesent sagittis, augue et dignissim pretium, massa augue porta ipsum, vitae hendrerit erat risus vel mauris. Fusce sollicitudin massa sed consectetur iaculis. Nam erat nisi, porta eget mattis non, volutpat quis lectus. Pellentesque eget viverra purus, a accumsan dolor. Nam euismod neque mattis, volutpat sapien eget, viverra nisl.

Aliquam in auctor leo, et auctor magna. Aliquam quis auctor nunc. Duis non ante justo. Etiam feugiat vehicula urna, vitae ornare felis tristique et. Quisque eu ante sapien. Vivamus tempus est et risus semper lacinia. Donec congue, erat vitae elementum viverra, massa leo lobortis arcu, at tincidunt lorem mi nec justo. Praesent ut justo nec augue ultricies efficitur. Etiam ut tincidunt neque. Nam diam nibh, posuere id sagittis ut, iaculis quis ante.

Curabitur finibus ut tortor quis ornare. Morbi vitae tellus magna. Cras interdum at lectus vel tincidunt. Cras non luctus tellus. Cras a leo vitae risus rutrum sollicitudin in tincidunt ligula. Fusce dolor enim, porttitor in eleifend tincidunt, ultricies vel libero. Aliquam id leo non nisl rutrum tempus ut et diam. Integer porttitor, est a consectetur laoreet, risus lorem ultricies ipsum, pharetra lacinia libero mi a libero. Donec ac lectus hendrerit, tincidunt diam interdum, cursus augue.
            """,
        }
    )
else:
    print("DB has documents")

for items in db.news.find():
    print(items)


@app.route("/api/hello")
def hello_world():
    return jsonify(payload="Hola desde flask")


@app.route("/api/news_list")
def newsList():
    # TODO: Sort the response by the layout order.
    cursor = db.news.find()
    list_cur = list(cursor)
    return dumps(list_cur)


@app.route("/api/post/<id>")
def getPostByID(id):
    print(id)
    cursor = db.news.find_one({"_id": ObjectId(id)})
    print(cursor)
    return dumps(cursor)


if __name__ == "__main__":
    if len(sys.argv) == 1:
        app.run("0.0.0.0", 5000, debug=True)
    elif len(sys.argv) > 1 and sys.argv[1] == "True":
        # This way we run the server in a production mode
        from waitress import serve

        serve(app, host="0.0.0.0", port=5000)
