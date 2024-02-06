import { useEffect, useState } from "react";
import OpenAI from "openai";
import "./App.css";

const apiKey = import.meta.env.VITE_OPEN_AI_KEY;
const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });

function App() {
  const [response, setResponse] = useState<string>("");
  // Stores and sets our input value
  const [value, setValue] = useState<string>("");
  // We will now have multiple prompts (or messages), so we store these values
  // using useState so that the chatbot has a 'memory' of our 'conversation'.
  // We also use a type that OpenAI provides for messages
  // We also add the previous messages array as the default value.
  const [messages, setMessages] = useState<OpenAI.ChatCompletionMessageParam[]>(
    [
      { role: "system", content: "You are a helpful assistant." },
      { role: "assistant", content: "Who is Jurgen Klopp?" },
    ]
  );

  console.log(messages);

  useEffect(() => {
    const fetchData = async () => {
      const response = await openai.chat.completions.create({
        // Here, we set the messages to as our state value
        // We also use another type that OpenAI provides for messages
        messages: messages as OpenAI.ChatCompletionCreateParams["messages"],
        model: "gpt-3.5-turbo",
      });
      setResponse(response.choices[0].message.content || "Ask me anything!");
    };
    fetchData();
    // We add messages to the dependency array so that the response on the page
    // is updated when the messages value changes.
  }, [messages]);

  // This function takes the value that is typed into the text input and adds
  // this new prompt to the messages array (storing our conversation)
  // Again, we use a type that OpenAI provides for the userMessage
  function updateMessages(messageInput: string) {
    const userMessage: OpenAI.ChatCompletionUserMessageParam = {
      role: "user",
      content: messageInput,
    };
    setMessages((messages) => [...messages, userMessage]);
  }
  // We add an input which stores and displays the value we type in
  // We add a button which, when clicked, will run the updateMessages() function
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
