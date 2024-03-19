"use client";

import { useState } from "react";
import axios from "axios";
import "./App.css";
import React from "react";

const App = () => {
  const [response, setResponse] = useState<string>(
    "Hi there! How can I assist you?"
  );
  const [value, setValue] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleSubmit = async () => {
    setLoading(true);
    const response = (await axios.post("/chat", { question: value })).data
      .choices[0].message.content;
    setResponse(response);
    setLoading(false);
    setQuestion(value);
  };

  return (
    <>
      <h1 className="header">🔴 ChatLFC ⚽️</h1>
      <div className="container">
        <div>
          <input
            type="text"
            value={value}
            onChange={onChange}
            onFocus={() => setValue("")}
          ></input>
        </div>
        <div>
          <button onClick={handleSubmit} disabled={!value.trim()}>
            {loading ? "Just one sec, lad..." : "Click me for answers!"}
          </button>
        </div>
        <div>
          <p className="response">Chatbot: {response}</p>
        </div>
      </div>
      <p className="disclaimer">
        This chatbot provides information about results and goal contributions
        for LFC from the 2023/24 season. The app is a WIP and more data is being
        added daily.
      </p>
      <h4>Created by Sammy-Jo Wymer. Copyright &copy; 2024</h4>
    </>
  );
};

export default App;
