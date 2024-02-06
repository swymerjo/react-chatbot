// import useState so that we can update the response we get from the API
import { useEffect, useState } from "react";
import OpenAI from "openai";
import "./App.css";

const apiKey = import.meta.env.VITE_OPEN_AI_KEY;
const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

function App() {
  // We store and update the responses we get from the API with this state
  const [response, setResponse] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "assistant", content: "Who is Jurgen Klopp?" },
        ],
        model: "gpt-3.5-turbo",
      });
      // Here, we store the response or set a default value if there is no response
      // Note, this is the same code we had for the console.log
      // but now we're storing the value instead of printing it to the console
      setResponse(response.choices[0].message.content || "Ask me anything");
    };
    fetchData();
  }, []);
  // In our return statement, we show the response on our page
  return (
    <div className="container">
      <div>
        <p>Chatbot: {response}</p>
      </div>
    </div>
  );
}

export default App;
