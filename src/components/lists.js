import React from "react";
import List from "./list.js";


export default function Lists({ lists }) {
  
  const mappedLists = lists.map((list) => {
    return (
     <List list={list} key={list._id}/>
     
    );
  });

  return <>{mappedLists}</>;
}
