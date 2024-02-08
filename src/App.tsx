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
          "You love Liverpool FC. Your name is Darwizzy and you have a personality similar to Darwin Nunez (a football player who currently plays for Liverpool). You have latin and scouse humour. Keep your responses to less than 30 words. When you are asked a question about Liverpool's results, fixtures, and statistics use the provided information delimited by triple quotes to answer questions.",
      },
      {
        role: "user",
        content: ` """ On 4 FEBRUARY in PREMIER LEAGUE at EMIRATES STADIUM the score was Arsenal 3 - 1 Liverpool
          On 31 JANUARY in PREMIER LEAGUE at ANFIELD the score was Liverpool 4 - 1 Chelsea
          On 28 JANUARY in EMIRATES FA CUP at ANFIELD the score was Liverpool 5 - 2 Norwich
          On 24 JANUARY in CARABAO CUP at CRAVEN COTTAGE the score was Fulham 1 - 1 Liverpool
          On 21 JANUARY in PREMIER LEAGUE at VITALITY STADIUM the score was Bournemouth 0 - 4 Liverpool
          On 10 JANUARY in CARABAO CUP at ANFIELD the score was Liverpool 2 - 1 Fulham
          On 7 JANUARY in EMIRATES FA CUP at EMIRATES STADIUM the score was Arsenal 0 - 2 Liverpool
          On 1 JANUARY in PREMIER LEAGUE at ANFIELD the score was Liverpool 4 - 2 Newcastle
          On 26 DECEMBER in PREMIER LEAGUE at TURF MOOR the score was Burnley 0 - 2 Liverpool
          On 23 DECEMBER in PREMIER LEAGUE at ANFIELD the score was Liverpool 1 - 1 Arsenal
          On 20 DECEMBER in CARABAO CUP at ANFIELD the score was Liverpool 5 - 1 West Ham
          On 17 DECEMBER in PREMIER LEAGUE at ANFIELD the score was Liverpool 0 - 0 Man Utd
          On 14 DECEMBER in EUROPA LEAGUE at LOTTO PARK the score was R. Union SG 2 - 1 Liverpool
          On 9 DECEMBER in PREMIER LEAGUE at SELHURST PARK the score was Crystal Palace 1 - 2 Liverpool
          On 6 DECEMBER in PREMIER LEAGUE at BRAMALL LANE the score was Sheff Utd 0 - 2 Liverpool
          On 3 DECEMBER in PREMIER LEAGUE at ANFIELD the score was Liverpool 4 - 3 Fulham
          On 30 NOVEMBER in EUROPA LEAGUE at ANFIELD the score was Liverpool 4 - 0 LASK
          On 25 NOVEMBER in PREMIER LEAGUE at ETIHAD STADIUM the score was Man City 1 - 1 Liverpool
          On 12 NOVEMBER in PREMIER LEAGUE at ANFIELD the score was Liverpool 3 - 0 Brentford
          On 9 NOVEMBER in EUROPA LEAGUE at STADIUM DE TOULOUSE the score was Toulouse 3 - 2 Liverpool
          On 5 NOVEMBER in PREMIER LEAGUE at KENILWORTH ROAD the score was Luton 1 - 1 Liverpool
          On 1 NOVEMBER in CARABAO CUP at VITALITY STADIUM the score was Bournemouth 1 - 2 Liverpool
          On 29 OCTOBER in PREMIER LEAGUE at ANFIELD the score was Liverpool 3 - 0 Nottm Forest
          On 26 OCTOBER in EUROPA LEAGUE at ANFIELD the score was Liverpool 5 - 1 Toulouse
          On 21 OCTOBER in PREMIER LEAGUE at ANFIELD the score was Liverpool 2 - 0 Everton
          On 8 OCTOBER in PREMIER LEAGUE at AMERICAN EXPRESS STADIUM the score was Brighton 2 - 2 Liverpool
          On 5 OCTOBER in EUROPA LEAGUE at ANFIELD the score was Liverpool 2 - 0 Union SG
          On 30 SEPTEMBER in PREMIER LEAGUE at TOTTENHAM HOTSPUR STADIUM the score was Tottenham 2 - 1 Liverpool
          On 27 SEPTEMBER in CARABAO CUP at ANFIELD the score was Liverpool 3 - 1 Leicester
          On 24 SEPTEMBER in PREMIER LEAGUE at ANFIELD the score was Liverpool 3 - 1 West Ham
          On 21 SEPTEMBER in EUROPA LEAGUE at RAIFFEISEN ARENA the score was LASK 1 - 3 Liverpool
           """ `,
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
