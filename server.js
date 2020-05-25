const express = require("express");
const app = express();

app.use(express.json());

// För att kunna använda funktioner i db.js
const MONGO_DB = require("./db");

/*-----------*/
// Anropen

app.get("/lists", async (req, res) => {
  const data = await MONGO_DB.getAllLists();
  if (data.length) {
    res.status(200).send(data);
  } else {
    res.status(400).end();
  }
});

app.get("/items/:listId", async (req, res) => {
  let listId = req.params.listId;
  console.log("listId", listId);
  const data = await MONGO_DB.getAllItems(listId);
  if (data.length) {
    res.status(200).send(data);
  } else {
    res.status(400).end();
  }
});

app.post("/lists", async (req, res) => {
  if (!req.body.data === String) {
    return res.status(400).end();
  }
  let newList = {
    name: req.body.data,
  };
  const data = await MONGO_DB.createNewList(newList);
  res.status(201).send({ status: data }); // data är returnen i funktionen i db.js
});

app.post("/items/:listId", async (req, res) => {
  let listId = req.params.listId;
  let date = new Date().toDateString();

  if (!req.body.title.length && !req.body.description.length) {
    return res.status(400).end();
  }

  let newItem = {
    title: req.body.title,
    description: req.body.description,
    date: date,
    listId: listId,
  };
  console.log("newItem in server", newItem);
  const data = await MONGO_DB.createNewItem(newItem);
  res.status(200).send("Sucess");
});

app.delete("/lists/:id", async (req, res) => {
  let listId = req.params.id;
  const data = await MONGO_DB.deleteList(listId);
  if (!data.success) {
    return res.status(404).end();
  }

  if (data.success) {
    const data = await MONGO_DB.deleteItemsInList(listId);
  }
  res.status(204).send({ status: data });
});

app.delete("/items/:id", async (req, res) => {
  let itemId = req.params.id;
  const data = await MONGO_DB.deleteItem(itemId);
  if (!data.success) {
    return res.status(404).end();
  }
  res.status(204).send({ status: data });
});

app.listen(8080, () => {
  console.log("Server started 8080");
});

/* ------- */

//app.use(express.static("./build")); //för att starta server och frontend samtidigt. OBS! Kör npm run build först, sen starta nodemon
