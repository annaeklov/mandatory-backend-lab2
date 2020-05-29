import React from "react";
import List from "./list.js";

export default function Lists({ lists, updateLists }) {
  const mappedLists = lists.map((list, index) => {
    return (
      <List
        index={index}
        list={list}
        key={list._id}
        updateLists={updateLists}
        lists={lists}
      />
    );
  });

  return <>{mappedLists}</>;
}
