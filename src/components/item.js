import React, { useState } from "react";
import Modal from "./modal.js";
import axios from "axios";

export default function Item({ items, updateLists }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModalMove, setShowModalMove] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [itemId, setItemId] = useState("");

  function showDeleteModalFunction(statement) {
    setShowDeleteModal(statement);
  }

  function deleteItem(itemId) {
    axios
      .delete("/items/" + itemId)
      .then((res) => {
        updateLists();
        setItemId("");
      })
      .catch((err) => {
        console.log("Error from frontend-delete", err);
      });
    setShowDeleteModal(false);
  }

  const mappedItems = items.map((item) => {
    return (
      <div className="card border-dark mb-3" key={item._id}>
        <div className="card-header">Title: {item.title}</div>
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
          <button type="button" className="btn btn-light item-btn">
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
    </>
  );
}
