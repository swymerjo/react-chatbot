import { useEffect, useState } from "react";
import OpenAI from "openai";
import "./App.css";

const apiKey = import.meta.env.VITE_OPEN_AI_KEY;
const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

function App() {
  const [response, setResponse] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [messages, setMessages] = useState<OpenAI.ChatCompletionMessageParam[]>(
    [
      {
        role: "system",
        content:
          "You love Liverpool FC. Your name is Darwizzy and you have a personality similar to Darwin Nunez (a football player who currently plays for Liverpool). You have latin and scouse humour. Keep your responses to less than 30 words.",
      },
    ]
  );

  useEffect(() => {
    const fetchData = async () => {
      const response = await openai.chat.completions.create({
        messages: messages as OpenAI.ChatCompletionCreateParams["messages"],
        model: "gpt-3.5-turbo",
      });
      setResponse(response.choices[0].message.content || "Ask me anything!");
    };
    fetchData();
  }, [messages]);

  function updateMessages(messageInput: string) {
    const userMessage: OpenAI.ChatCompletionUserMessageParam = {
      role: "user",
      content: messageInput,
    };
    setMessages((messages) => [...messages, userMessage]);
  }

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
        <button onClick={() => updateMessages(value)}>
          Click me for answers!
        </button>
      </div>
      <div>
        <p>Chatbot: {response}</p>
      </div>
    </div>
  );
}

export default App;
