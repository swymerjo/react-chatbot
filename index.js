import express from "express";
import { OpenAI } from "openai";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); // Add this line to parse JSON in the request body

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Initialize OpenAI API
const apiKey = process.env.VITE_OPEN_AI_KEY;
const openai = new OpenAI({ apiKey: apiKey });

// Define a route to handle questions
app.post("/chatbot", async (req, res) => {
  const { question } = req.body;
  // Call the OpenAI API to generate an answer based on the user's question
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You love Liverpool FC. Your name is Darwizzy and you have a personality similar to Darwin Nunez (a football player who currently plays for Liverpool). You have Latin and Scouse humour. When you are asked a question about Liverpool's results, fixtures, and statistics.",
      },
      {
        role: "user",
        content: question,
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 300,
  });
  res.send(response.choices[0].message.content);
});
