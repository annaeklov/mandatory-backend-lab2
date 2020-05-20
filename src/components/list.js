import React, { useEffect, useState } from "react";
import axios from "axios";

import Item from "./item.js";
import Modal from "./modal.js";

export default function List({ list, updateLists }) {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [description, setDescription] = useState(" ");
  const [title, setTitle] = useState(" ");

  useEffect(() => {
    updateItems();
    return () => {};
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

  function showModalFunction(statement) {
    setShowModal(statement);
  }
  function onChangeDescription(e) {
    setDescription(e.target.value);
  }
  function onChangeTitle(e) {
    setTitle(e.target.value);
  }

  function deleteList(list) {
    axios
      .delete("/lists/" + list._id)
      .then((res) => {
        updateLists();
      })
      .catch((err) => {
        console.log("Error from frontend-delete", err);
      });
  }

  return (
    <>
      <div className="list__oneDiv">
        {showModal && (
          <Modal
            showModalFunction={showModalFunction}
            modalTitle={"Add item"}
            description={description}
            onChangeDescription={onChangeDescription}
            onChangeTitle={onChangeTitle}
            title={title}
          />
        )}
        <h4>{list.name}</h4>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => {
            deleteList(list);
          }}
        >
          Delete {list.name}-list
        </button>
        {!items.length && <p>No items in this list..</p>}

        <Item items={items} />
        <button
          type="button"
          className="btn btn-light"
          onClick={() => {
            showModalFunction(true);
          }}
        >
          Add new item
        </button>
      </div>
    </>
  );
}
