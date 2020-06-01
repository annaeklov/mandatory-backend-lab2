import React, { useState } from "react";
import Modal from "./modal.js";
import axios from "axios";

export default function Item({ items, lists, updateLists, listId, listName }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModalMove, setShowModalMove] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [itemId, setItemId] = useState("");
  const [itemTitle, setItemTitle] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [newListId, setNewListId] = useState("");

  function showDeleteModalFunction(statement) {
    setShowDeleteModal(statement);
  }

  function showModalEditFunction(statement) {
    setShowModalEdit(statement);
  }

  function showModalMoveFunction(statement) {
    setShowModalMove(statement);
  }

  function deleteItem(itemId) {
    axios
      .delete("/items/" + itemId)
      .then((res) => {
        updateLists();
        setItemId("");
      })
      .catch((err) => {
        console.log(err);
      });
    setShowDeleteModal(false);
  }

  function editItem(itemId) {

    if (itemTitle.trim().length === 0 && itemDescription.trim().length === 0) {
      setItemTitle("");
      setItemDescription("");
      return;
    }
    axios
      .put("/edititems/" + itemId, {
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

  function moveItem(itemId) {
    axios
      .put("/moveitems/" + itemId, { listId: newListId })
      .then((res) => {
        updateLists();
        setItemId("");
      })
      .catch((err) => {
        console.log("Error from frontend-move", err);
      });
    setShowModalMove(false);
  }

  function onChangeMoveItem(e) {
    setNewListId(e.target.value);
  }

  function onChangeDescription(e) {
    setItemDescription(e.target.value);
  }
  function onChangeTitle(e) {
    setItemTitle(e.target.value);
  }

  const mappedItems = items.map((item) => {
    return (
      <div className="card mb-3" key={item._id}>
        <div className="card-body text-dark">
          <strong>{item.title}</strong>
          <p className="card-text"> {item.description}</p>
        </div>
        <div className="card-footer bg-transparent">
          <p className="date__p">Created: {item.date}</p>

          <i
            className="fas fa-trash-alt"
            title="Delete item"
            onClick={() => {
              setShowDeleteModal(true);
              setItemId(item._id);
            }}
          ></i>

          <i
            className="fas fa-edit"
            title="Edit item"
            onClick={() => {
              setShowModalEdit(true);
              setItemId(item._id);
              setItemTitle(item.title);
              setItemDescription(item.description);
            }}
          ></i>

          <i
            className="fas fa-arrows-alt"
            title="Move item"
            onClick={() => {
              setShowModalMove(true);
              setItemId(item._id);
            }}
          ></i>
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
      {showModalMove && (
        <Modal
          showModalMove={showModalMove}
          modalTitle={"Move item"}
          lists={lists}
          listName={listName}
          showModalFunction={showModalMoveFunction}
          onChangeMoveItem={onChangeMoveItem}
          onClickSaveFunction={() => {
            moveItem(itemId);
          }}
        />
      )}
    </>
  );
}
