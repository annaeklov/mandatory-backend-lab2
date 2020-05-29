import React, { useEffect, useState } from "react";
import axios from "axios";

import Lists from "./lists.js";
import Modal from "./modal.js";

export default function Board({ overlay }) {
  const [lists, setLists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [maxList, setMaxList] = useState(false);

  useEffect(() => {
    updateLists();
  }, []);

  function updateLists() {
    axios
      .get("/lists")
      .then((res) => {
        console.log("UPDATE LISTS ->", res.data);
        setLists(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function showModalFunction(statement) {
    setShowModal(statement);
  }

  function onChangeTitle(e) {
    setTitle(e.target.value);
  }

  function addNewList(e) {
    e.preventDefault();
    if (lists.length >= 10) {
      setMaxList("Max 10 lists.. Delete lists to add more");
      return;
    }

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
          errorMsg={maxList}
        />
      )}

      <div className="board__header">
        <button
          type="button"
          className="btn btn-light"
          onClick={() => {
            showModalFunction(true);
          }}
        >
          Add new list
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
