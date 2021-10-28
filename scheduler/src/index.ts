import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import Parser from 'rss-parser';
const parser = new Parser();
import { MongoClient } from 'mongodb';

// Check if production
var env = process.env.NODE_ENV || 'development';
console.log(env);

// Connection URL
const url = env === 'development' ? 'mongodb://root:example@localhost:27017' : "mongodb://root:example@db:27017/";
const client = new MongoClient(url);

// Database Name
const dbName = 'newspaper';



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
    // Connect to mongo db
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('news');
    // Delete everithing from the database
    await collection.deleteMany({})
    // Download rss feed
    const feed = await parser.parseURL('https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada');
    // Go through all rss data
    feed.items.forEach((item) => {
        collection.insertOne({
            "title": item.title,
            "body": item['content:encoded']
        });
    })
    return { status: 200 }
})

const start = async () => {
    try {
        await server.listen(5050, "0.0.0.0")

        const address = server.server.address()
        const port = typeof address === 'string' ? address : address?.port

        console.log(`Serving on port ${port}`);

    } catch (err) {
        server.log.error(err)
        process.exit(1)
    }
}
start()