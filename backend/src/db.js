import { MongoClient, ServerApiVersion } from "mongodb";
import { config } from "dotenv";
config();
const uri = process.env.uri;
// // // // console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
// Connect to the MongoDB cluster
await client.connect();
// check if db exists
const db = client.db("tickers");

export default db;
