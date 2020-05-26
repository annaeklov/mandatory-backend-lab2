import React, { useEffect, useState } from "react";
import axios from "axios";

import Item from "./item.js";
import Modal from "./modal.js";

export default function List({ list, updateLists }) {
  const [items, setItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    updateItems();
    return () => {};
  }, [list]);

  function updateItems() {
    axios
      .get("/items/" + list._id)
      .then((res) => {
        console.log("UPDATE ITEMS ->", res.data);
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function showModalFunction(statement) {
    setShowModal(statement);
    setShowDescription(true);
  }

  function showDeleteModalFunction(statement) {
    setShowDeleteModal(statement);
  }

  function onChangeDescription(e) {
    setDescription(e.target.value);
  }
  function onChangeTitle(e) {
    setTitle(e.target.value);
  }

  function deleteList() {
    axios
      .delete("/lists/" + list._id)
      .then((res) => {
        console.log("DELETE LIST, ", res)
        updateLists();
      })
      .catch((err) => {
        console.log( err);
      });
    setShowDeleteModal(false);
  }

  function addNewItem(e) {
    e.preventDefault();

    if (title.trim().length === 0 && description.trim().length === 0) {
      setTitle("");
      setDescription("");
      return;
    }

    axios
      .post("/items/" + list._id, {
        title: title,
        description: description,
        listId: list._id,
      })
      .then((res) => {
        console.log("post new item", res.data);
        updateItems();
        setTitle("");
        setDescription("");
      })
      .catch((err) => {
        console.log("Error from frontend-post", err);
      });
    showModalFunction(false);
  }

  return (
    <>
      <div className="list__oneDiv">
        {showModal && (
          <Modal
            showModal={showModal}
            onClickSaveFunction={addNewItem}
            showModalFunction={showModalFunction}
            modalTitle={"Add item"}
            description={description}
            onChangeDescription={onChangeDescription}
            onChangeTitle={onChangeTitle}
            title={title}
            showDescription={showDescription}
          />
        )}
        {showDeleteModal && (
          <Modal
            showModalFunction={showDeleteModalFunction}
            onClickSaveFunction={deleteList}
            modalTitle={"Delete list"}
            showDeleteModal={showDeleteModal}
          />
        )}
        <h2>{list.name}</h2>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => {
            showDeleteModalFunction(true);
          }}
        >
          Delete {list.name}-list
        </button>
        {!items.length && <p>No items in this list..</p>}

        <Item items={items} updateLists={updateLists}/>
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
