"use client";

import { useState } from "react";
import axios from "axios";
import "../App.css";
import React from "react";

const Chatbot = () => {
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
    try {
      const response = (await axios.post("/api/openai", { question: value }))
        .data.choices[0].message.content;
      setResponse(response);
      setLoading(false);
      setQuestion(value);
    } catch (error) {
      console.log("Error details:", error);
    }
  };

  return (
    <>
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
        <p className="box">Chatbot: {response}</p>
      </div>
    </>
  );
};

export default Chatbot;
