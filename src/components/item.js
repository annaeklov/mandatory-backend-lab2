import React from "react";

export default function Item() {
  return (
    <>
      <div className="card border-dark mb-3">
        <div className="card-header">Header</div>
        <div className="card-body text-dark">
          <h5 className="card-title">Dark card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
        <div class="card-footer bg-transparent border-dark">Footer</div>
      </div>
    </>
  );
}