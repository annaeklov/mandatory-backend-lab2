const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const ObjectId = mongo.ObjectId;

// Connection URL
// Ska ofta (alltid) vara denna url
const url = "mongodb://localhost:27017";

// Database name
// Kan heta vad som helst
// Heter labbDB nu
const dbName = "labbDB";

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });
client.connect();
let db = client.db(dbName);

/*-----------*/
// Funktioner

/* async function functionName() {
  try {
    const result = await db.collection("collectionNameHere");
    return result;
  } catch {
    throw error;
  }
} */

/*-----------*/
// Exporterar funktionen till server.js

/* module.exports.functionName = functionName;
 */
