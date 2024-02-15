import { useState } from "react";
import axios from "axios";
import "./App.css";

const AppBackend = () => {
  const [response, setResponse] = useState<string>(
    "Hi there! How can I assist you?"
  );
  const [value, setValue] = useState<string>("");

  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:3005/chatbot", {
      question: value,
    });
    setResponse(response.data);
  };

  return (
    <div className="container">
      <div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
      </div>
      <div>
        <button onClick={handleSubmit}>Click me for answers!</button>
      </div>
      <div>
        <p>Chatbot: {response}</p>
      </div>
    </div>
  );
};

export default AppBackend;
