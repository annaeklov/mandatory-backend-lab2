import React from "react";

export default function Modal({
  showModalFunction,
  showModal,
  onClickSaveFunction,
  modalTitle,
  description,
  onChangeDescription,
  onChangeTitle,
  title,
  showDescription,
  showDeleteModal,
  showModalEdit,
  itemTitle,
  itemDescription,
  showModalMove,
  lists,
  listName,
  onChangeMoveItem,
}) {
  return (
    <>
      <div className="overlay"></div>
      <div
        style={{ display: "block", opacity: "1" }}
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                {modalTitle}
              </h5>
            </div>

            <div className="modal-body">
              {showDeleteModal && <p>Are you sure you want to delete it?</p>}
              {showModalEdit && (
                <form onSubmit={onClickSaveFunction}>
                  <label name="title">Title:</label>
                  <input
                    type="text"
                    name="title"
                    required
                    autoFocus
                    minLength="1"
                    maxLength="20"
                    onChange={onChangeTitle}
                    value={itemTitle}
                  />

                  <br />
                  <label name="description">Description:</label>
                  <input
                    type="text"
                    name="description"
                    required
                    minLength="1"
                    maxLength="20"
                    onChange={onChangeDescription}
                    value={itemDescription}
                  />
                </form>
              )}
              {showModal && (
                <form onSubmit={onClickSaveFunction}>
                  <label name="title">Title:</label>
                  <input
                    type="text"
                    name="title"
                    required
                    autoFocus
                    minLength="1"
                    maxLength="40"
                    onChange={onChangeTitle}
                    value={showModalEdit ? itemTitle : title}
                  />
                 

                  {showDescription && (
                    <>
                      <br />
                      <label name="description">Description:</label>
                      <input
                        type="text"
                        name="description"
                        required
                        minLength="1"
                        maxLength="100"
                        onChange={onChangeDescription}
                        value={description}
                      />
                    </>
                  )}
                </form>
              )}
              {showModalMove && (
                <label htmlFor="lists">
                  Move item from {listName} to:
                  <br />
                  <select
                    name="lists"
                    id="lists"
                    onChange={(e) => onChangeMoveItem(e)}
                  >
                    {lists.map((list) => {
                      return (
                        <option value={list._id} key={list._id}>
                          {list.name}
                        </option>
                      );
                    })}
                  </select>
                </label>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => showModalFunction(false)}
              >
                {showDeleteModal ? <span>No, close</span> : <span>Close</span>}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onClickSaveFunction}
              >
                {showDeleteModal ? (
                  <span>Yes, delete it</span>
                ) : (
                  <span>Save changes</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
