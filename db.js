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

async function getAllLists() {
  try {
    const result = await db.collection("listsCollection").find().toArray();
    return result;
  } catch {
    throw error;
  }
}

async function getAllItems(listId) {
  try {
    const result = await db
      .collection("itemsCollection")
      .find({ listId: ObjectId(listId) })
      .toArray();
    return result;
  } catch {
    throw error;
  }
}

/*-----------*/
// Exporterar funktionen till server.js

module.exports.getAllLists = getAllLists;
module.exports.getAllItems = getAllItems;
