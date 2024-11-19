/* eslint-disable no-unused-vars */
import React from "react";

import "./App.css";
import KanbanBoard from "./components/KanbanBoard";

const App = () => {
  return (
    <div className="App">
      <KanbanBoard style={{ margin: "0px", padding: "0px" }} />
    </div>
  );
};

export default App;
