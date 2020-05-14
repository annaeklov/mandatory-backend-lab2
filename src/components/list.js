import React from "react";
import Item from "./item.js";

export default function List() {
  return (
    <>
      <div className="col">
        <h4>List title</h4>
        <Item />
        <Item />
      </div>
      <div className="col">
        <h4>List title</h4>
        <Item />
      </div>
      <div className="col">
        <h4>List title</h4>
      </div>
      
    </>
  );
}
