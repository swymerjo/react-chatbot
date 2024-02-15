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
          "You love Liverpool FC. Your name is Darwizzy and you have a personality similar to Darwin Nunez (a football player who currently plays for Liverpool). You have latin and scouse humour. Keep your responses to less than 30 words. When you are asked a question about Liverpool's results, fixtures, and statistics use the provided information delimited by triple quotes to answer questions.",
      },
      {
        role: "user",
        content: ` """ On 13 August 2023 in the Premier League at Home. Liverpool drew against Chelsea. The score was 1 - 1. The game was played on a Sunday and the referee was Anthony Taylor. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 35%.
        On 19 August 2023 in the Premier League at Home. Liverpool won against Bournemouth. The score was 3 - 1. The game was played on a Saturday and the referee was Thomas Bramall. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 64%.
        On 27 August 2023 in the Premier League Away. Liverpool won against Newcastle Utd. The score was 2 - 1. The game was played on a Sunday and the referee was John Brooks. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 41%.
        On 03 September 2023 in the Premier League at Home. Liverpool won against Aston Villa. The score was 3 - 0. The game was played on a Sunday and the referee was SiMonday Hooper. Our captain was Trent Alexander-Arnold. We played a 4-3-3 formation and our possession was 63%.
        On 16 September 2023 in the Premier League Away. Liverpool won against Wolves. The score was 3 - 1. The game was played on a Saturday and the referee was Michael Oliver. Our captain was Andrew Robertson. We played a 4-3-3 formation and our possession was 65%.
        On 21 September 2023 in the Europa League Group stage Away. Liverpool won against LASK. The score was 3 - 1. The game was played on a Thursday and the referee was Marco Di Bello. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 66%.
        On 24 September 2023 in the Premier League at Home. Liverpool won against West Ham. The score was 3 - 1. The game was played on a Sunday and the referee was Chris Kavanagh. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 63%.
        On 27 September 2023 in the EFL Cup Third round at Home. Liverpool won against Leicester City. The score was 3 - 1. The game was played on a Wednesday and the referee was Tim Robinson. Our captain was Curtis Jones. We played a 4-3-3 formation and our possession was 57%.
        On 30 September 2023 in the Premier League Away. Liverpool lost against Tottenham. The score was 1 - 2. The game was played on a Saturday and the referee was Simon Hooper. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 36%.
        On 05 October 2023 in the Europa League Group stage at Home. Liverpool won against Union SG. The score was 2 - 0. The game was played on a Thursday and the referee was Morten Krogh. Our captain was Trent Alexander-Arnold. We played a 4-3-3 formation and our possession was 72%.
        On 08 October 2023 in the Premier League Away. Liverpool drew against Brighton. The score was 2 - 2. The game was played on a Sunday and the referee was Anthony Taylor. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 54%.
        On 21 October 2023 in the Premier League at Home. Liverpool won against Everton. The score was 2 - 0. The game was played on a Saturday and the referee was Craig Pawson. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 77%.
        On 26 October 2023 in the Europa League Group stage at Home. Liverpool won against fr Toulouse. The score was 5 - 1. The game was played on a Thursday and the referee was Rade Obrenović. Our captain was Trent Alexander-Arnold. We played a 4-3-3 formation and our possession was 62%.
        On 29 October 2023 in the Premier League at Home. Liverpool won against Nott'ham Forest. The score was 3 - 0. The game was played on a Sunday and the referee was Chris Kavanagh. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 72%.
        On 01 November 2023 in the EFL Cup Fourth round at Away. Liverpool won against Bournemouth. The score was 2 - 1. The game was played on a Wednesday and the referee was John Brooks. Our captain was Mohamed Salah. We played a 4-3-3 formation and our possession was 67%.
        On 05 November 2023 in the Premier League Away. Liverpool drew against Luton Town. The score was 1 - 1. The game was played on a Sunday and the referee was Andy Madley. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 73%.
        On 09 November 2023 in the Europa League Group stage Away. Liverpool lost against fr Toulouse. The score was 2 - 3. The game was played on a Thursday and the referee was Georgi Kabakov. Our captain was Joe Gomez. We played a 4-3-3 formation and our possession was 71%.
        On 12 November 2023 in the Premier League at Home. Liverpool won against Brentford. The score was 3 - 0. The game was played on a Sunday and the referee was Paul Tierney. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 59%.
        On 25 November 2023 in the Premier League Away. Liverpool drew against Manchester City. The score was 1 - 1. The game was played on a Saturday and the referee was Chris Kavanagh. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 41%.
        On 30 November 2023 in the Europa League Group stage at Home. Liverpool won against at LASK. The score was 4 - 0. The game was played on a Thursday and the referee was Urs Schnyder. Our captain was Mohamed Salah. We played a 4-3-3 formation and our possession was 65%.
        On 03 December 2023 in the Premier League at Home. Liverpool won against Fulham. The score was 4 - 3. The game was played on a Sunday and the referee was Stuart Attwell. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 61%.
        On 06 December 2023 in the Premier League Away. Liverpool won against Sheffield Utd. The score was 2 - 0. The game was played on a Wednesday and the referee was SiMonday Hooper. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 75%.
        On 09 December 2023 in the Premier League Away. Liverpool won against Crystal Palace. The score was 2 - 1. The game was played on a Saturday and the referee was Andy Madley. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 76%.
        On 14 December 2023 in the Europa League Group stage Away. Liverpool lost against be Union SG. The score was 1 - 2. The game was played on a Thursday and the referee was Orel Grinfeeld. Our captain was Curtis Jones. We played a 4-3-3 formation and our possession was 68%.
        On 17 December 2023 in the Premier League at Home. Liverpool drew against Manchester Utd. The score was 0 - 0. The game was played on a Sunday and the referee was Michael Oliver. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 68%.
        On 20 December 2023 in the EFL Cup Quarter-finals at Home. Liverpool won against West Ham. The score was 5 - 1. The game was played on a Wednesday and the referee was Tim Robinson. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 67%.
        On 23 December 2023 in the Premier League at Home. Liverpool drew against Arsenal. The score was 1 - 1. The game was played on a Saturday and the referee was Chris Kavanagh. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 68%.
        On 26 December 2023 in the Premier League Away. Liverpool won against Burnley. The score was 2 - 0. The game was played on a Tuesday and the referee was Paul Tierney. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 68%.
        On 01 January 2024 in the Premier League at Home. Liverpool won against Newcastle Utd. The score was 4 - 2. The game was played on a Monday and the referee was Anthony Taylor. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 61%.
        On 07 January 2024 in the FA Cup Third round proper Away. Liverpool won against Arsenal. The score was 2 - 0. The game was played on a Sunday and the referee was John Brooks. Our captain was Trent Alexander-Arnold. We played a 4-3-3 formation and our possession was 46%.
        On 10 January 2024 in the EFL Cup Semi-finals at Home. Liverpool won against Fulham. The score was 2 - 1. The game was played on a Wednesday and the referee was David Coote. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 67%.
        On 21 January 2024 in the Premier League Away. Liverpool won against Bournemouth. The score was 4 - 0. The game was played on a Sunday and the referee was Andy Madley. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 60%.
        On 24 January 2024 in the EFL Cup Semi-finals Away. Liverpool drew against Fulham. The score was 1 - 1. The game was played on a Wednesday and the referee was SiMonday Hooper. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 51%.
        On 28 January 2024 in the FA Cup Fourth round proper at Home. Liverpool won against Norwich City. The score was 5 - 2. The game was played on a Sunday and the referee was Samuel Barrott. Our captain was Alisson. We played a 4-3-3 formation and our possession was 73%.
        On 31 January 2024 in the Premier League at Home. Liverpool won against Chelsea. The score was 4 - 1. The game was played on a Wednesday and the referee was Paul Tierney. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 50%.
        On 04 February 2024 in the Premier League Away. Liverpool lost against Arsenal. The score was 1 - 3. The game was played on a Sunday and the referee was Anthony Taylor. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 57%.
        On 10 February 2024 in the Premier League at Home. Liverpool won against Burnley. The score was 3 - 1. The game was played on a Saturday and the refereee was Tim Robinson. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 70%. """ - ${question}`,
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 300,
  });
  res.send(response.choices[0].message.content);
});
