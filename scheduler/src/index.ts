import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import Parser from 'rss-parser';
const parser = new Parser();
import { InsertOneResult, MongoClient } from 'mongodb';
const metascraper = require('metascraper')([
    require('metascraper-image')(),
])
import got from 'got';

// Check if production
var env = process.env.NODE_ENV || 'development';

// Connection URL
const url = env === 'development' ? 'mongodb://root:example@localhost:27017' : "mongodb://root:example@db:27017";
const client = new MongoClient(url);

// Database Name
const dbName = 'newspaper';
const collectionName = 'news';
// Create db var
const db = client.db(dbName);



const server: FastifyInstance = Fastify({})

const opts: RouteShorthandOptions = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    status: {
                        type: 'number'
                    },
                }
            }
        }
    }
}

server.get('/scheduler/', opts, async (_request, _reply) => {
    const collection = db.collection(collectionName);
    // Download rss feed
    const feed = await parser.parseURL('https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada');
    // Create a promise array to resolve all 
    let mongoDBpromises: Promise<InsertOneResult<Document>>[] = [];
    // Go through all rss data
    feed.items.forEach(async (item) => {
        // Get meta tags from the link item
        const { body: html, url } = await got(item.guid ? item.guid : "");
        const metadata = await metascraper({ html, url });
        // Get everything from the database
        const newsData = collection.find({ guid: item.guid });
        if (await newsData.count() == 0) {
            mongoDBpromises.push(
                collection.insertOne({
                    "title": item.title,
                    "guid": item.guid,
                    "body": item['content:encoded'],
                    "image": metadata.image
                })
            );
        }

    })
    // Drop the index 
    collection.dropIndexes()
        .then(() => {
            // Create an index to search 
            collection.createIndex({ title: "text", body: "text" })
        })
    // Wait for all inserts to be completed and then return.
    return Promise.allSettled(mongoDBpromises)
        .then(() => { return { status: 200 } })
})

const start = async () => {
    try {
        env === 'development' ? await server.listen(5050, "0.0.0.0") : await server.listen(80, "0.0.0.0")

        // Establish and verify connection
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Connected successfully to mongo");
        try {
            await db.createCollection(collectionName);
        } catch (error) {
        }

        const address = server.server.address()
        const port = typeof address === 'string' ? address : address?.port

        console.log(`Serving on port ${port}`);

    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}
start()