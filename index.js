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
          "You love Liverpool FC. Your name is Darwizzy and you have a personality similar to Darwin Nunez (a football player who currently plays for Liverpool). You have latin and scouse humour. Keep your responses to less than 30 words. When you are asked a question about Liverpool's results, fixtures, players and statistics use the provided information delimited by triple quotes to answer questions.",
      },
      {
        role: "user",
        content: `
        Our current squad is as follows: 
        
        Alisson, Goalkeeper, 31, Brazil
        Caoimhín Kelleher, Goalkeeper, 25, Ireland
        Adrián, Goalkeeper, 37, Spain
        Ibrahima Konaté, Centre-Back, 24, France Mali
        Virgil van Dijk, Centre-Back, 32, Netherlands Suriname
        Joe Gomez, Centre-Back, 26, England The Gambia
        Joel Matip, Centre-Back, 32, Cameroon Germany
        Jarell Quansah, Centre-Back, 21, England Scotland
        Rhys Williams, Centre-Back, 23, England Jamaica
        Andrew Robertson, Left-Back, 29, Scotland
        Konstantinos Tsimikas, Left-Back, 27, Greece
        Trent Alexander-Arnold, Right-Back, 25, England
        Conor Bradley, Right-Back, 20, Northern Ireland
        Wataru Endo, Defensive Midfield, 31, Japan
        Stefan Bajcetic, Defensive Midfield, 19, Spain Serbia
        Dominik Szoboszlai, Central Midfield, 23, Hungary
        Alexis Mac Allister, Central Midfield, 25, Argentina Italy
        Ryan Gravenberch, Central Midfield, 21, Netherlands Suriname
        Curtis Jones, Central Midfield, 23, England
        Thiago, Central Midfield, 32, Spain Brazil
        Harvey Elliott, Attacking Midfield, 20, England
        Luis Díaz, Left Winger, 27, Colombia
        Cody Gakpo, Left Winger, 24, Netherlands Togo
        Diogo Jota, Left Winger, 27, Portugal
        Mohamed Salah, Right Winger, 31, Egypt
        Ben Doak, Right Winger, 18, Scotland
        Darwin Núñez, Centre-Forward, 24, Uruguay

        Our current goals and assists for the season so far as as follows:

        Top scorers
        Mohamed Salah 15
        Darwin Núñez 9
        Diogo Jota 9
        Luis Díaz 5
        Cody Gakpo 4
        Dominik Szoboszlai 3
        Trent Alexander-Arnold 2
        Alexis Mac Allister 2
        Virgil van Dijk 1
        Harvey Elliott 1
        Curtis Jones 1
        Wataru Endo 1
        Andy Robertson 1
        Conor Bradley 1

        Top assists
        Mohamed Salah 10
        Darwin Núñez 7
        Trent Alexander-Arnold 5
        Diogo Jota 4
        Luis Díaz 3
        Cody Gakpo 3
        Kostas Tsimikas 3
        Conor Bradley 3
        Virgil van Dijk 2
        Dominik Szoboszlai 2
        Harvey Elliott 2
        Joe Gomez 1
        Alexis Mac Allister 1
        Ryan Gravenberch 1
        Curtis Jones 1

        Our results for the season so far are as follows:
        
        On 13 August 2023 in the Premier League at Home. Liverpool drew against Chelsea. The score was 1 - 1. The game was played on a Sunday and the referee was Anthony Taylor. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 35%. Luis Diaz scored in the 18th minute with an assist from Mohamed Salah. Axel Disasi scored for Chelsea in the 37th minute with an assist from Ben Chilwell.
        On 19 August 2023 in the Premier League at Home. Liverpool won against Bournemouth. The score was 3 - 1. The game was played on a Saturday and the referee was Thomas Bramall. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 64%. Antoine Semenyo scored for Bournemouth in the 3rd minute with an assist from Dominic Solanke. Luis Diaz scored in the 27th minute. Mohamed Salah scored in the 36th minute. Mohamed Salah missed a penalty in the 36th minute. Alexis Mac Allister was sent off for Liverpool in the 58th minute. Diogo Jota scored in the 62nd minute.
        On 27 August 2023 in the Premier League Away. Liverpool won against Newcastle Utd. The score was 2 - 1. The game was played on a Sunday and the referee was John Brooks. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 41%. Anthony Gordon scored for Newcastle in the 25th minute. Virgil van Dijk was sent off for Liverpool in the 28th minute. Darwin Nunez scored in the 81st minute. Darwin Nunez scored again in the 93rd minute with an assist from Alexis Mac Allister.
        On 03 September 2023 in the Premier League at Home. Liverpool won against Aston Villa. The score was 3 - 0. The game was played on a Sunday and the referee was SiMonday Hooper. Our captain was Trent Alexander-Arnold. We played a 4-3-3 formation and our possession was 63%. Dominik Szoboszlai scored in the 3rd minute with an assist from Trent Alexander-Arnold. Matty Cash scored an own goal in the 22nd minute to make it 2-0 to Liverpool. Mohamed Salah scored in the 55th minute with an assist from Darwin Nunez.
        On 16 September 2023 in the Premier League Away. Liverpool won against Wolves. The score was 3 - 1. The game was played on a Saturday and the referee was Michael Oliver. Our captain was Andrew Robertson. We played a 4-3-3 formation and our possession was 65%. Hwang Hee-chan scored for Wolves in the 7th minute with an assist from Pedro Neto. Cody Gakpo scored in the 55th minute with an assist from Mohamed Salah. Andrew Robertson scored in the 85th minute with an assist from Mohamed Salah. Hugo Bueno scored an own goal in the 91st minute to make it 3-1 to Liverpool.
        On 21 September 2023 in the Europa League Group stage Away. Liverpool won against LASK. The score was 3 - 1. The game was played on a Thursday and the referee was Marco Di Bello. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 66%. Florian Flecker scored for Lask in the 14th minute with an assist from Sascha Horvath. Darwin Nunez scored a penalty in the 56th minute. Luiz Diaz scored in the 63rd minute with an assist from Ryan Gravenberch. Mohamed Salah scored in the 88th minute with an assist from Darwin Nunez.
        On 24 September 2023 in the Premier League at Home. Liverpool won against West Ham. The score was 3 - 1. The game was played on a Sunday and the referee was Chris Kavanagh. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 63%. Mohamed Salah scored a penalty in the 16th minute. Jarrod Bowed scored for West Ham in the 42nd minute with an assist from Vladimír Coufal. Darwin Nunez scored in the 60th minute with an assist from Alexis Mac Allister. Diogo Jota scored in the 85th minute with an assist from Virgil van Dijk.
        On 27 September 2023 in the EFL Cup Third round at Home. Liverpool won against Leicester City. The score was 3 - 1. The game was played on a Wednesday and the referee was Tim Robinson. Our captain was Curtis Jones. We played a 4-3-3 formation and our possession was 57%. Kasey McAteer scored for Leicester in the 3rd minute with an assist from Yunus Akgün. Cody Gakpo scored in the 48th minute with an assist from Ryan Gravenberch. Dominik Szoboszlai scored in the 70th minute with an assist from Wataru Endo. Diogo Jota scored in the 89th minute with an assist from Jarell Quansah.
        On 30 September 2023 in the Premier League Away. Liverpool lost against Tottenham. The score was 1 - 2. The game was played on a Saturday and the referee was Simon Hooper. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 36%. Curtis Jones was sent off for Liverpool in the 26th minute. Son Heung-min scored for Tottenham in the 36th minute with an assist from Richarlison. Cody Gakpo scored in the 49th minute with an assist from Virgil van Dijk. Diogo Jota was sent off for Liverpool in the 69th minute. Joel Matip scored an own goal to make it 2-1 to Tottenham in the 96th minute. 
        On 05 October 2023 in the Europa League Group stage at Home. Liverpool won against Union SG. The score was 2 - 0. The game was played on a Thursday and the referee was Morten Krogh. Our captain was Trent Alexander-Arnold. We played a 4-3-3 formation and our possession was 72%. Ryan Gravenberch scored a goal in the 44th minute with an assist from Trent Alexander-Arnold. Diogo Jota scored a goal in the 92nd minute.
        On 08 October 2023 in the Premier League Away. Liverpool drew against Brighton. The score was 2 - 2. The game was played on a Sunday and the referee was Anthony Taylor. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 54%. Simon Adingra scored a goal for Brighton in the 20th minute. Mohamed Salah scored a goal in the 40th minute with an assist from Darwin Nunez. Mohamed Salah scored a penalty in the 46th minute. Lewis Dunk scored a goal for Brighton in the 78th minute with an assist from Solly March.
        On 21 October 2023 in the Premier League at Home. Liverpool won against Everton. The score was 2 - 0. The game was played on a Saturday and the referee was Craig Pawson. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 77%. Mohamed Salah scored a penalty in the 75th minute. Mohamed Salah scored another goal in the 97th minute with an assist from Darwin Nunez.
        On 26 October 2023 in the Europa League Group stage at Home. Liverpool won against Toulouse. The score was 5 - 1. The game was played on a Thursday and the referee was Rade Obrenović. Our captain was Trent Alexander-Arnold. We played a 4-3-3 formation and our possession was 62%. Diogo Jota scored a goal in the 9th minute with an assist from Joe Gomez. Thijs Dallinga scored a goal for Toulouse in the 16th minute with an assist from Aron Dønnum. Wataru Endo scored a goal in the 30th minute with an assist from Trent Alexander-Arnold. Darwin Nunez scored a goal in the 34th minute with an assist from Curtis Jones. Ryan Gravenberch scored a goal in the 65th minute. Mohamed Salah scored a goal in the 89th minute with an assist from Cody Gakpo. 
        On 29 October 2023 in the Premier League at Home. Liverpool won against Nottingham Forest. The score was 3 - 0. The game was played on a Sunday and the referee was Chris Kavanagh. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 72%. Diogo Jota scored a goal in the 31st minute. Darwin Nunez scored a goal in the 35th minute with an assist from Dominik Szoboszlai. Mohamed Salah scored a goal in the 77th minute with an assist from Dominik Szoboszlai.
        On 01 November 2023 in the EFL Cup Fourth round at Away. Liverpool won against Bournemouth. The score was 2 - 1. The game was played on a Wednesday and the referee was John Brooks. Our captain was Mohamed Salah. We played a 4-3-3 formation and our possession was 67%. Cody Gakpo scored a goal in the 31st minute. Justin Kluivert scored a goal for Bournemouth in the 64th minute with an assist from Alex Scott. Darwin Nunez scored a goal in the 70th minute with an assist from Trent Alexander-Arnold.
        On 05 November 2023 in the Premier League Away. Liverpool drew against Luton Town. The score was 1 - 1. The game was played on a Sunday and the referee was Andy Madley. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 73%. Tahith Chong scored a goal for Luton Town in the 80th minute with an assist from Issa Kaboré. Luis Diaz scored a goal in the 95th minute with an assist from Harvey Elliott. 
        On 09 November 2023 in the Europa League Group stage Away. Liverpool lost against Toulouse. The score was 2 - 3. The game was played on a Thursday and the referee was Georgi Kabakov. Our captain was Joe Gomez. We played a 4-3-3 formation and our possession was 71%. Aron Dønnum scored a goal for Toulouse in the 36th minute. Thijs Dallinga scored a goal for Toulouse in the 58th minute with an assist from Vincent Sierro. Cristian Cásseres Jr. scored an own goal to make it 2-1 in the 74th minute. Frank Magri scored a goal for Toulouse in the 76th minute with an assist from Gabriel Suazo. Diogo Jota scored a goal in the 89th minute with an assist from Alexis Mac Allister. 
        On 12 November 2023 in the Premier League at Home. Liverpool won against Brentford. The score was 3 - 0. The game was played on a Sunday and the referee was Paul Tierney. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 59%. Mohamed Salah scored a goal in the 39th minute with an assist from Darwin Nunez. Mohamed Salah scored another goal in the 62nd minute with an assist from Kostas Tsimikas. Diogo Jota scored a goal in the 74th minute with an assist from Kostas Tsimikas.
        On 25 November 2023 in the Premier League Away. Liverpool drew against Manchester City. The score was 1 - 1. The game was played on a Saturday and the referee was Chris Kavanagh. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 41%. Erling Haaland scored a goal for Manchester City in the 27th minute with an assist from Nathan Ake. Trent Alexander-Arnold scored a goal in the 80th minute with an assist from Mohamed Salah.
        On 30 November 2023 in the Europa League Group stage at Home. Liverpool won against at LASK. The score was 4 - 0. The game was played on a Thursday and the referee was Urs Schnyder. Our captain was Mohamed Salah. We played a 4-3-3 formation and our possession was 65%. Luis Diaz scored a goal in the 12th minute with an assist from Joe Gomez. Cody Gakpo scored a goal in the 15th minute with an assist from Mohamed Salah. Mohamed Salah scored a goal in the 51st minute. Cody Gakpo scored a goal in the 92nd minute with an assist from Trent Alexander-Arnold.
        On 03 December 2023 in the Premier League at Home. Liverpool won against Fulham. The score was 4 - 3. The game was played on a Sunday and the referee was Stuart Attwell. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 61%. Harry Wilson scored a goal for Fulham in the 24th minute with an assist from Antonee Robinson. Alexis Mac Allister scored a goal in the 38th minute. Kenny Tete scored a goal for Fulham in the 48th minute. Bobby Reid scored a goal for Fulham in the 80th minute with an assist from Tom Cairney. Wataru Endo scored a goal in the 87th minute with an assist from Mohamed Salah. Trent Alexander-Arnold scored in the 88th minute with an assist from Kostas Tsimikas.
        On 06 December 2023 in the Premier League Away. Liverpool won against Sheffield Utd. The score was 2 - 0. The game was played on a Wednesday and the referee was SiMonday Hooper. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 75%. Virgin van Dijk scored a goal in the 37th minute with an assist from Trent Alexander-Arnold. Dominik Szoboszlai scored a goal in the 94th minute with an assist from Darwin Nunez.
        On 09 December 2023 in the Premier League Away. Liverpool won against Crystal Palace. The score was 2 - 1. The game was played on a Saturday and the referee was Andy Madley. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 76%. Jean-Philippe Mateta scored a penalty for Crystal Palace in the 57th minute. Mohamed Salah scored a goal in the 76th minute with an assist from Curtis Jones. Harvey Elliott scored in the 91st minute with an assist from Mohamed Salah.
        On 14 December 2023 in the Europa League Group stage Away. Liverpool lost against be Union SG. The score was 1 - 2. The game was played on a Thursday and the referee was Orel Grinfeeld. Our captain was Curtis Jones. We played a 4-3-3 formation and our possession was 68%. Mohamed El Amine Amoura scored a goal for Union SG in the 32nd minute with an assist from Gustaf Nilsson. Jarell Quansah scored a goal in the 39th minute with an assist from Curtis Jones. Cameron Puertas scored a goal for Union SG in the 43rd minute with an assist from Mohamed El Amine Amoura.   
        On 17 December 2023 in the Premier League at Home. Liverpool drew against Manchester Utd. The score was 0 - 0. The game was played on a Sunday and the referee was Michael Oliver. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 68%. No goals or assists in this game.
        On 20 December 2023 in the EFL Cup Quarter-finals at Home. Liverpool won against West Ham. The score was 5 - 1. The game was played on a Wednesday and the referee was Tim Robinson. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 67%. Dominik Szoboszlai scored a goal in the 28th minute with an assist from Jarell Quansah. Curtis Jones scored a goal in the 56th minute with an assist from Darwin Nunez. Cody Gakpo scored a goal in the 71st minute with an assist from Ibrahima Konate. Jarrod Bowen scored a goal for WestHam in the 77th minute with an assist from Ben Johnson. Mohamed Salah scored a goal in the 82nd minute with an assist from Trent Alexander-Arnold. Curtis Jones scored another goal in the 84th minute with an assist from Trent Alexander-Arnold.
        On 23 December 2023 in the Premier League at Home. Liverpool drew against Arsenal. The score was 1 - 1. The game was played on a Saturday and the referee was Chris Kavanagh. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 68%. Gabriel Dos Santos scored a goal for Arsenal in the 4th minute with and assist from Martin Ødegaard. Mohamed Salah scored a goal in the 29th minute with an assist from Trent Alexander-Arnold
        On 26 December 2023 in the Premier League Away. Liverpool won against Burnley. The score was 2 - 0. The game was played on a Tuesday and the referee was Paul Tierney. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 68%. Darwin Nunez scored a goal in the 6th minute with an assist from Cody Gakpo. Diogo Jota scored a goal in the 90th minute with an assist from Luis Diaz.
        On 01 January 2024 in the Premier League at Home. Liverpool won against Newcastle Utd. The score was 4 - 2. The game was played on a Monday and the referee was Anthony Taylor. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 61%. Mohamed Salah missed a penalty in the 22nd minute. Mohamed Salah scored a goal in the 49th minute with an assist from Darwin Nunez. Alexander Isak scored a goal for Newcastle in the 54th minute with an Anthony Gordon assist. Curtis Jones scored a goal in the 74th minute with a Diogo Jota assist. Cody Gakpo scored a goal in the 78th minute with a Mohamed Salah assist. Sven Botman scored a goal for Newcastle in the 81st minute with an assist from Sean Longstaff. Mohamed Salah scored a goal a penalty in the 86th minute.
        On 07 January 2024 in the FA Cup Third round proper Away. Liverpool won against Arsenal. The score was 2 - 0. The game was played on a Sunday and the referee was John Brooks. Our captain was Trent Alexander-Arnold. We played a 4-3-3 formation and our possession was 46%. Jakub Kiwior scored an own goal in the 80th minute to make it 0-1 to Liverpool. Luis Diaz scored a goal in the 95th minute with an assist from Diogo Jota.
        On 10 January 2024 in the EFL Cup Semi-finals at Home. Liverpool won against Fulham. The score was 2 - 1. The game was played on a Wednesday and the referee was David Coote. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 67%. Willian scored a goal for Fulham in the 19th minute with an assist from Andreas Pereira. Curtis Jones scored a goal in the 68th minute with an assist from Darwin Nunez. Cody Gakpo scored a goal in the 71st minute with an assist from Darwin Nunez.
        On 21 January 2024 in the Premier League Away. Liverpool won against Bournemouth. The score was 4 - 0. The game was played on a Sunday and the referee was Andy Madley. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 60%.  Darwin Nunez scored a goal in the 49th minute with a Diogo Jota assist. Diogo Jota scored a goal in the 70th minute with a Cody Gakpo assist. Diogo Jota scored a goal again in the 79th minute with a Conor Bradley assist. Darwin Nunez scored a goal in the 93rd minute with a Joe Gomez assist.
        On 31 January 2024 in the Premier League at Home. Liverpool won against Chelsea. The score was 4 - 1. The game was played on a Wednesday and the referee was Paul Tierney. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 50%. Diogo Jota scored a goal in the 23rd minute with a Conor Bradley assist. Conor Bradley scored a goal in the 39th minute with a Luis Diaz assist. Darwin Nunez missed a penalty in the 47th minute. Dominik Szoboszlai scored a goal in the 65th minute with a Conor Bradley assist. Christopher Nkunku scored a goal for Chelsea in the 71st minute with a Carney Chukwuemeka assist. Luis Diaz scored a goal in the 79th minute with a Darwin Nunez assist. 
        On 24 January 2024 in the EFL Cup Semi-finals Away. Liverpool drew against Fulham. The score was 1 - 1. The game was played on a Wednesday and the referee was Simon Hooper. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 51%. Luis Diaz scored a goal in the 11th minute with an assist from Jarell Quansah. Issa Diop scored a goal for Fulham in the 76th minute with an assist from Harry Wilson.
        On 28 January 2024 in the FA Cup Fourth round proper at Home. Liverpool won against Norwich City. The score was 5 - 2. The game was played on a Sunday and the referee was Samuel Barrott. Our captain was Alisson. We played a 4-3-3 formation and our possession was 73%. Curtis Jones scored a goal in the 16th minute with an assist from James McConnell. Ben Gibson scored a goal for Norwich in the 22nd minute with an assist from Gabriel. Darwin Nunez scored a goal in the 28th minute with an assist from Conor Bradley. Diogo Jota scored a goal in the 53rd minute. Virgil van Dijk scored a goal in the 63rd minute with an assist from Dominik Szoboszlai. Borja Sainz scored a goal for Norwich in the 69th minute. Ryan Gravenberch scored a goal in the 95th minute with an assist from Conor Bradley.
        On 04 February 2024 in the Premier League Away. Liverpool lost against Arsenal. The score was 1 - 3. The game was played on a Sunday and the referee was Anthony Taylor. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 57%. Bukayo Saka scored a goal for Arsenal in the 14th minute. Gabriel Dos Santos scored an own goal to make in 1-1 in the 48th minute. Gabriel Martinelli scored a goal for Arsenal in the 67th minute. Leandro Trossard scored a goal for Arsenal in the 92nd minute.
        On 10 February 2024 in the Premier League at Home. Liverpool won against Burnley. The score was 3 - 1. The game was played on a Saturday and the referee was Tim Robinson. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 70%. Diogo Jota scored a goal in the 31st minute with a Trent Alexander-Arnold assist. Dara O'Shea scored a goal for Burnley in the 45th minute with a Josh Brownhill assist. Luis Diaz scored a goal in the 52nd minute and Darwin Nunez scored a goal in the 79th minute with a Harvey Elliot assist.
        On 17 February 2024 in the Premier League Away. Liverpool won against Brentford. The score was 4 - 1. The game was played on a Saturday and the referee was Michael Oliver. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 62%. Darwin Nunez scored a goal in the 35th minute with a Diego Jota assist. Alexis Mac Allister scored a goal in the 55th minute with a Mo Salah assist. Mohamed Salah scored a goal in the 68th minute with a Cody Gakpo assist. Ivan Toney scored a goal in the 75th minute. Cody Gakpo scored a goal in the 86th minute with a Luis Diaz assist. - ${question}`,
      },
    ],
    model: "gpt-3.5-turbo",
    max_tokens: 300,
  });
  res.send(response.choices[0].message.content);
});
