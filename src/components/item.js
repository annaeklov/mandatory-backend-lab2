import React from "react";

export default function Item({ items }) {
  const mappedItems = items.map((item) => {
    return (
      <div className="card border-dark mb-3" key={item._id}>
        <div className="card-header">Title: {item.title}</div>
        <div className="card-body text-dark">
          <p className="card-text">Description: {item.description}</p>
        </div>
        <div className="card-footer bg-transparent border-dark">Date: 
          {item.date}
        </div>
        <div className="card-footer bg-transparent border-dark">
          Delete item, edit item, move item
        </div>
      </div>
    );
  });

  return <>{mappedItems}</>;
}
