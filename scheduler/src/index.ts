/* eslint-disable @typescript-eslint/no-var-requires */
import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify';
import Parser from 'rss-parser';
const parser = new Parser();
import { MongoClient } from 'mongodb';
const metascraper = require('metascraper')([
	require('metascraper-image')(),
]);
import got from 'got';

// Check if production
const env = process.env.NODE_ENV || 'development';

// Connection URL
const url = env === 'development' ? 'mongodb://root:example@localhost:27017' : 'mongodb://root:example@db:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'newspaper';
const newsName = 'news';
const categoryName = 'category';
const usersName = 'users';
// Create db var
const db = client.db(dbName);



const server: FastifyInstance = Fastify({});

const opts: RouteShorthandOptions = {
	schema: {
		response: {
			200: {
				type: 'object',
				properties: {
					status: {
						type: 'number',
						data: 'text'
					},
				}
			}
		}
	}
};

server.get('/scheduler/', opts, async () => {
	const news = db.collection(newsName);
	const categories = db.collection(categoryName);
	// Download rss feed
	const feed = await parser.parseURL('https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada');
	// Go through all rss data
	// eslint-disable-next-line no-async-promise-executor
	const mainPromise = new Promise(async resolve => {
		for (let i = 0; i < feed.items.length; i++) {
			const item = feed.items[i];
			// Check if the category is present in the database. If not add it.
			if (item.categories !== undefined)
				for (let i = 0; i < item.categories.length; i++) {
					const category = item.categories[i];
					const categoryData = categories.find({ 'category': category });
					if (await categoryData.count() == 0) { // Means it does not exist.
						await categories.insertOne({
							'category': category
						});
					}
				}
			// Get the filtered data from the database. Check if the guid exists inside the db.
			const newsData = news.find({ guid: item.guid });
			if (await newsData.count() == 0) {
				// Get meta tags from the link item.
				// Only do the request if it does not exist already.
				const { body: html, url } = await got(item.guid ?? '');
				const metadata = await metascraper({ html, url });
				// Push into promise array
				await news.insertOne({
					'title': item.title,
					'guid': item.guid,
					'body': item['content:encoded'],
					'image': metadata.image,
					'categories': item.categories
				});
			}
		}
		resolve('');
	});
	// Drop the index 
	await news.dropIndexes();
	await news.createIndex({ title: 'text', body: 'text' });
	// Wait for all inserts to be completed and then return.
	return await Promise.allSettled([mainPromise])
	// FIXME: The JSON.stringify does not return anything.
		.then(async () => { return { status: 200, data: JSON.stringify(await news.find({}).toArray()) }; });
});

const start = async () => {
	try {
		// Establish and verify connection
		await client.connect();
		await client.db('admin').command({ ping: 1 });
		console.log('Connected successfully to mongo');
		try {
			await db.createCollection(newsName);
			await db.createCollection(categoryName);
			await db.createCollection(usersName);

		} catch (error) {
			console.error(error);
		}
		// Rise up the server after the creation of the collection
		env === 'development' ? await server.listen(5050, '0.0.0.0') : await server.listen(80, '0.0.0.0');
		setInterval(() => {
			fetch('http://localhost/scheduler/')
		}, 1800000) // Every 30 minutes
		const address = server.server.address();
		const port = typeof address === 'string' ? address : address?.port;

		console.log(`Serving on port ${port}`);

	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};
start();