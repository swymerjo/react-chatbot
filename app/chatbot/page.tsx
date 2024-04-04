"use client";

import { useState } from "react";
import axios from "axios";
import "../App.css";
import React from "react";

function Chatbot() {
  const [response, setResponse] = useState<string>(
    "Hi there! How can I assist you?"
  );
  const [value, setValue] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
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
    <main className="chatbot-container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          id="question-input"
          aria-label="ask your question"
          value={value}
          onChange={onChange}
          onFocus={() => setValue("")}
          tabIndex={0}
        ></input>
        <button type="submit" tabIndex={0}>
          {loading ? "Just one sec, lad..." : "Click me for answers!"}
        </button>
      </form>
      <p className="box" tabIndex={0}>
        Darwizzy: {response}
      </p>
    </main>
  );
}

export default Chatbot;
