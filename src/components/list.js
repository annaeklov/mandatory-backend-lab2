import React, { useEffect, useState } from "react";
import axios from "axios";

import Item from "./item.js";

export default function List({ list }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    updateItems();
  }, [list]);

  function updateItems() {
    axios
      .get("/items/" + list._id)
      .then((res) => {
        console.log("RES.DATA GET/items", res.data);
        setItems(res.data);
      })
      .catch((e) => {
        console.log("Error from frontend", e);
      });
  }

  return (
    <>
      <div className="list__oneDiv">
        <h4>{list.name}</h4>
        {!items.length && <p>No items in this list..</p>}

        <Item items={items}/>
      </div>
    </>
  );
}
