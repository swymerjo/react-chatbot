import { useEffect } from "react";
import OpenAI from "openai";
import "./App.css";

const apiKey = import.meta.env.VITE_OPEN_AI_KEY;
const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are a helpful assistant." }],
        model: "gpt-3.5-turbo",
      });
      console.log(response.choices[0].message.content);
    };
    fetchData();
  }, []);

  return <div className="container"></div>;
}

export default App;
