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

async function createNewList(newList) {
  try {
    const result = await db.collection("listsCollection").insert(newList);
    return "Success in creating a new list";
  } catch (error) {
    console.log("Error in creating a new list", error);
    throw error;
  }
}

async function createNewItem(newItem) {
  newItem.listId = ObjectId(newItem.listId)
  try {
    const result = await db.collection("itemsCollection").insertOne(newItem);
    return "Success in creating a new item";
  } catch {
    throw error;
  }
}

async function deleteList(listId) {
  try {
    const result = await db
      .collection("listsCollection")
      .deleteOne({ _id: ObjectId(listId) });
    if (result.length) {
      return "Success in deleting a room";
    }
    return "Could not find room";
  } catch (error) {
    console.log("Error in deleting a room", error);
    throw error;
  }
}

/*-----------*/
// Exporterar funktionen till server.js

module.exports.getAllLists = getAllLists;
module.exports.getAllItems = getAllItems;
module.exports.createNewList = createNewList;
module.exports.createNewItem = createNewItem;
module.exports.deleteList = deleteList;
