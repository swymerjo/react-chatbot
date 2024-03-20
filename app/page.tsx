import "./App.css";
import React from "react";
import Chatbot from "./chatbot/page";
import Disclaimer from "./disclaimer/page";
import Header from "./header/header";

const App = () => {
  return (
    <>
      <Header />
      <Chatbot />
      <Disclaimer />
    </>
  );
};

export default App;
