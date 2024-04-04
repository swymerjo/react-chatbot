"use client";

import { useState } from "react";
import axios from "axios";
import "../App.css";
import React from "react";

function Chatbot() {
  const [response, setResponse] = useState<string>();
  const [value, setValue] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<any>([
    {
      chatbot: "Hi there how can I assist you?",
    },
  ]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    setLoading(true);
    try {
      const response = (
        await axios.post("/api/openai", {
          question: value,
        })
      ).data.choices[0].message.content;
      setResponse(response);
      setMessages((prevMessages: any) => [
        ...prevMessages,
        { chatbot: response, user: value },
      ]);
    } catch (error) {
      console.log("Error details:", error);
    } finally {
      setLoading(false);
      setQuestion(value);
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
          placeholder="What would you like to ask?"
        ></input>
        <button type="submit" tabIndex={0}>
          {loading ? "Just one sec, lad..." : "Click me for answers!"}
        </button>
      </form>
      {messages.map((message: any, index: number) => {
        return (
          <React.Fragment key={index}>
            {message.user ? (
              <>
                <p className="box user" tabIndex={0}>
                  You: {message.user}
                </p>
                <p className="box" tabIndex={0}>
                  Darwizzy: {message.chatbot}
                </p>
              </>
            ) : (
              <p className="box" tabIndex={0}>
                Darwizzy: {message.chatbot}
              </p>
            )}
          </React.Fragment>
        );
      })}
    </main>
  );
}

export default Chatbot;
