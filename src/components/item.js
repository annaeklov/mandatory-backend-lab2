import React, { useState } from "react";
import Modal from "./modal.js";
import axios from "axios";

export default function Item({ items, updateLists }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModalMove, setShowModalMove] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [itemId, setItemId] = useState("");
  const [itemTitle, setItemTitle] = useState("");
  const [itemDescription, setItemDescription] = useState("");

  function showDeleteModalFunction(statement) {
    setShowDeleteModal(statement);
  }

  function showModalEditFunction(statement) {
    setShowModalEdit(statement);
  }

  function deleteItem(itemId) {
    axios
      .delete("/items/" + itemId)
      .then((res) => {
        console.log("DELETE ITEM, ", res);
        updateLists();
        setItemId("");
      })
      .catch((err) => {
        console.log(err);
      });
    setShowDeleteModal(false);
  }

  function editItem(itemId) {
    axios
      .put("/items/" + itemId, {
        title: itemTitle,
        description: itemDescription,
      })
      .then((res) => {
        updateLists();
        setItemId("");
      })
      .catch((err) => {
        console.log("Error from frontend-put", err);
      });
    setShowModalEdit(false);
  }

  function onChangeDescription(e) {
    setItemDescription(e.target.value);
  }
  function onChangeTitle(e) {
    setItemTitle(e.target.value);
  }

  const mappedItems = items.map((item) => {
    return (
      <div className="card border-dark mb-3" key={item._id}>
        <div className="card-header">
          <strong>{item.title}</strong>
        </div>
        <div className="card-body text-dark">
          <p className="card-text">Description: {item.description}</p>
        </div>

        <div className="card-footer bg-transparent border-dark">
          <button
            type="button"
            className="btn btn-light item-btn"
            onClick={() => {
              setShowDeleteModal(true);
              setItemId(item._id);
            }}
          >
            Delete item
          </button>
          <button
            type="button"
            className="btn btn-light item-btn"
            onClick={() => {
              setShowModalEdit(true);
              setItemId(item._id);
              setItemTitle(item.title);
              setItemDescription(item.description);
            }}
          >
            Edit item
          </button>
          <button type="button" className="btn btn-light item-btn">
            Move item
          </button>
          <p>Date: {item.date}</p>
        </div>
      </div>
    );
  });

  return (
    <>
      {mappedItems}
      {showDeleteModal && (
        <Modal
          showDeleteModal={showDeleteModal}
          modalTitle={"Delete item"}
          showModalFunction={showDeleteModalFunction}
          onClickSaveFunction={() => {
            deleteItem(itemId);
          }}
        />
      )}
      {showModalEdit && (
        <Modal
          showModalEdit={showModalEdit}
          modalTitle={"Edit item"}
          showModalFunction={showModalEditFunction}
          itemTitle={itemTitle}
          itemDescription={itemDescription}
          onChangeDescription={onChangeDescription}
          onChangeTitle={onChangeTitle}
          onClickSaveFunction={() => {
            editItem(itemId);
          }}
        />
      )}
    </>
  );
}
