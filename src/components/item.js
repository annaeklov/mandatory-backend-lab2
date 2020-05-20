import React, { useState } from "react";

export default function Item({ items }) {
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalMove, setShowModalMove] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const mappedItems = items.map((item) => {
    return (
      <div className="card border-dark mb-3" key={item._id}>
        <div className="card-header">Title: {item.title}</div>
        <div className="card-body text-dark">
          <p className="card-text">Description: {item.description}</p>
        </div>
        
        <div className="card-footer bg-transparent border-dark">
        <p>Date: {item.date}</p>
          <p>Delete item, edit item, move item</p>
        </div>
      </div>
    );
  });

  return <>{mappedItems}</>;
}
