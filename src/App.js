import React from "react";
import "./App.css";

import Header from "./components/header.js";
import Board from "./components/board.js";

export default function App() {
  return (
    <div className="container app">
      <Header />
      <Board />
      <footer>
        <br />
        <p style={{ color: "grey" }}>Created by Anna Eklöv 2020</p>
      </footer>
    </div>
  );
}
