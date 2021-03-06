import React, { useEffect, useState } from "react";
import axios from "axios";

import Lists from "./lists.js";
import Modal from "./modal.js";

export default function Board({ overlay }) {
  const [lists, setLists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    updateLists();
  }, []);

  function updateLists() {
    axios
      .get("/lists")
      .then((res) => {
        setLists(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function showModalFunction(statement) {
    setShowModal(statement);
    setTitle("");
  }

  function onChangeTitle(e) {
    setTitle(e.target.value);
  }

  function addNewList(e) {
    e.preventDefault();

    if (title.trim().length === 0) {
      setTitle("");
      return;
    }
    
    axios
      .post("/lists", { data: title })
      .then((res) => {
        updateLists();
        setTitle("");
      })
      .catch((err) => {
        console.log("Error from frontend-post", err);
      });
    showModalFunction(false);
  }

  return (
    <main>
      {showModal && (
        <Modal
          showModal={showModal}
          onClickSaveFunction={addNewList}
          showModalFunction={showModalFunction}
          modalTitle={"Add list"}
          onChangeTitle={onChangeTitle}
          title={title}
        />
      )}

      <div className="board__header">
        <button
          type="button"
          className="btn btn-outline-dark btn-add-list"
          onClick={() => {
            showModalFunction(true);
          }}
        >
          Add list
        </button>
      </div>
      <div className="board__listDivs">
        {!lists.length ? (
          <p>No lists..</p>
        ) : (
          <Lists lists={lists} updateLists={updateLists} />
        )}
      </div>
    </main>
  );
}
