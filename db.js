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
    const result = await db.collection("listsCollection").insertOne(newList);
    return "Success in creating a new list";
  } catch (error) {
    console.log("Error in creating a new list", error);
    throw error;
  }
}

async function createNewItem(newItem) {
  newItem.listId = ObjectId(newItem.listId);
  try {
    const result = await db.collection("itemsCollection").insertOne(newItem);
    return { success: true, statusCode: 201 };
  } catch {
    throw error;
  }
}

async function deleteList(listId) {
  try {
    const result = await db
      .collection("listsCollection")
      .deleteOne({ _id: ObjectId(listId) });

    if (result.deletedCount === 1) {
      return { success: true, statusCode: 204 };
    }
    return "Could not find list";
  } catch (error) {
    console.log("Error in deleting a list", error);
    throw error;
  }
}

async function deleteItemsInList(listId) {
  try {
    const result = await db
      .collection("itemsCollection")
      .deleteMany({ listId: ObjectId(listId) });

    if (result) {
      return { success: true, statusCode: 204 };
    }
    return "Could not find items";
  } catch (error) {
    console.log("Error in deleting items", error);
    throw error;
  }
}

async function deleteItem(itemId) {
  try {
    const result = await db
      .collection("itemsCollection")
      .deleteOne({ _id: ObjectId(itemId) });

    if (result.deletedCount === 1) {
      return { success: true, statusCode: 204 };
    }
    return "Could not find item";
  } catch (error) {
    console.log("Error in deleting an item", error);
    throw error;
  }
}

async function editItem(itemId, editItem) {
  try {
    const result = await db.collection("itemsCollection").updateOne(
      { _id: ObjectId(itemId) },
      {
        $set: {
          title: editItem.title,
          description: editItem.description,
        },
      }
    );
    if (result.modifiedCount === 1) {
      return { success: true, statusCode: 200 };
    }
    return "Could not find item";
  } catch (error) {
    console.log("Error in editing an item", error);
    throw error;
  }
}

async function moveItem(itemId, newListId) {
  console.log("NEWLISTID I DB->", newListId);
  try {
    const result = await db.collection("itemsCollection").updateOne(
      { _id: ObjectId(itemId) },
      {
        $set: {
          listId: ObjectId(newListId.listId),
        },
      }
    );
    if (result) {
      return { success: true, statusCode: 200 };
    }
    return "Could not find item";
  } catch (error) {
    console.log("Error in moving an item", error);
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
module.exports.deleteItemsInList = deleteItemsInList;
module.exports.deleteItem = deleteItem;
module.exports.editItem = editItem;
module.exports.moveItem = moveItem;
