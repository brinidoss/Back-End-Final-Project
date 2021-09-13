import { MongoClient } from 'mongodb';
import * as functions from 'firebase-functions';
console.log(functions.config().mongodb);
const uri = functions.config().mongodb.uri || '';
if (!uri) {
  console.error("ERROR: Missing environment variable");
}
//console.log(uri);
const client: MongoClient = new MongoClient(uri);

export const getClient = async () => {
	await client.connect();
	return client;
};