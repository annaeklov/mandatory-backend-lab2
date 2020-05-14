const express = require("express");
const app = express();

app.use(express.json());

// För att kunna använda funktioner i db.js
const MONGO_DB = require("./db");


/*-----------*/
// Anropen

/* app.get("", async (req, res) => {
  const data = await MONGO_DB.functionName();
  if ("something, something") {
    res.status(200).send(data);
  } else {
    res.status(400).end();
  }
}); */

app.listen(8080, () => {
  console.log("Server started 8080");
});

/* ------- */

//app.use(express.static("./build")); //för att starta server och frontend samtidigt. OBS! Kör npm run build först, sen starta nodemon