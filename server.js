const express = require("express");
const app = express();

//app.use(express.json()); // den "enkla" vägen

// Middleware för JSON.parse
app.use((req, res, next) => {
  if (req.is('json')) {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk.toString();
    });

    req.on('end', () => {
      try {
        data = JSON.parse(data);
        req.body = data;
        next();
      } catch (e) {
        res.status(400).end();
      }
    });
  } else {
    next();
  }
});

// För att kunna använda funktioner i db.js
const MONGO_DB = require("./db");

// Middleware log
app.use((req, res, next) => {
  let start = new Date();
  res.once('finish', () => {
    console.log(req.method, req.path, res.statusCode, new Date() - start,'ms');
  });
  next();
});

/*-----------*/
// Anropen

app.get("/lists", async (req, res) => {
  const data = await MONGO_DB.getAllLists();
  if (data) {
    res.status(200).send(data);
  } else {
    res.status(500).end();
  }
});

app.get("/items/:listId", async (req, res) => {
  let listId = req.params.listId;
  const data = await MONGO_DB.getAllItems(listId);
  if (data) {
    res.status(200).send(data);
  } else {
    res.status(500).end();
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

app.put("/edititems/:id", async (req, res) => {
  let itemId = req.params.id;
  let editItem = {
    title: req.body.title,
    description: req.body.description,
  };

  if (!editItem) return res.status(400).end();

  const data = await MONGO_DB.editItem(itemId, editItem);
  if (!data.success) {
    return res.status(400).end();
  }
  res.status(204).send(editItem);
});

app.put("/moveitems/:id", async (req, res) => {
  let itemId = req.params.id;
  let newListId = req.body;
  if (!newListId) return res.status(400).end();

  const data = await MONGO_DB.moveItem(itemId, newListId);
  if (!data.success) {
    return res.status(400).end();
  }
  res.status(204).send({ status: "Sucess" });
});

app.listen(8080, () => {
  console.log("Server started 8080");
});


