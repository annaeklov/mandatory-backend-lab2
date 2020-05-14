import React from "react";
import "./App.css";

import Header from "./components/header.js";
import Board from "./components/board.js";


export default function App() {
  return (
    <div className="container app">
      <Header />
      <Board />
      <footer className="row"></footer>
    </div>
  );
}
