import React, { useEffect, useState } from "react";
import axios from "axios";

import Lists from "./lists.js";

export default function Board() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    updateLists();
  }, []);

  function updateLists() {
    axios
      .get("/lists")
      .then((res) => {
        console.log("RES.DATA GET/lists", res.data);
        setLists(res.data);
      })
      .catch((e) => {
        console.log("Error from frontend", e);
      });
  }

  return (
    <main>
      <div className="board__header">
        <button type="button" className="btn btn-light">
          Add new list
        </button>
      </div>
      <div className="board__listDivs">
        <Lists lists={lists} />
      </div>
    </main>
  );
}
