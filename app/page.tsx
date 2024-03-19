import "./App.css";
import React from "react";
import Chatbot from "./chatbot/page";

const App = () => {
  return (
    <>
      <h1 className="header">🔴 ChatLFC ⚽️</h1>
      <div className="container">
        <Chatbot />
      </div>
      <p className="box disclaimer">
        This chatbot provides information about results and goal contributions
        for LFC from the 2023/24 season. The app is a WIP and more data is being
        added daily.
      </p>
      <h4>Created by Sammy-Jo Wymer. Copyright &copy; 2024</h4>
    </>
  );
};

export default App;
