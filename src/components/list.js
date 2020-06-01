import React, { useEffect, useState } from "react";
import axios from "axios";

import Item from "./item.js";
import Modal from "./modal.js";

export default function List({ lists, list, updateLists, index }) {
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
        updateLists();
      })
      .catch((err) => {
        console.log(err);
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
        updateItems();
        setTitle("");
        setDescription("");
      })
      .catch((err) => {
        console.log("Error from frontend-post", err);
      });
    showModalFunction(false);
  }
  function randomBGColor() {
    let color = [
      "#FF9AA2",
      "#FFB2B2",
      "#FFDAC1",
      "#E2F0CB",
      "#B5EAD7",
      "#FF9AA2",
      "#FFB2B2",
      "#FFDAC1",
      "#E2F0CB",
      "#B5EAD7",
    ];
    return { backgroundColor: color[index] };
  }

  return (
    <>
      <div className="list__oneDiv" style={randomBGColor()}>
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
        <div className="list__header">
          <h2>{list.name.toUpperCase()}</h2>
          <i
            className="far fa-window-close"
            onClick={() => {
              showDeleteModalFunction(true);
            }}
          ></i>
        </div>
        {!items.length && <p>No items in this list..</p>}

        <Item
          items={items}
          updateLists={updateLists}
          listId={list._id}
          listName={list.name}
          lists={lists}
        />
        <button
          type="button"
          className="btn btn-outline-dark btn-add-item"
          onClick={() => {
            showModalFunction(true);
          }}
        >
          Add item
        </button>
      </div>
    </>
  );
}
