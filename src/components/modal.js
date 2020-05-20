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
}) {
  return (
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
            {showDeleteModal && (
              <p>Are you sure? Click save changes to delete list.</p>
            )}
            {showModal && (
              <form>
                <label name="title">Title:</label>
                <input
                  type="text"
                  name="title"
                  required
                  autoFocus
                  minLength="1"
                  maxLength="20"
                  onChange={onChangeTitle}
                  value={title}
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
                      maxLength="20"
                      onChange={onChangeDescription}
                      value={description}
                    />
                  </>
                )}
              </form>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => showModalFunction(false)}
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClickSaveFunction}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
