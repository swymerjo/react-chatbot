const { OpenAI } = require("openai");
import * as cheerio from "cheerio";
import axios from "axios";
import {
  DefensiveData,
  GoalkeepingData,
  ShootingData,
  StandardData,
} from "../../../types";

const apiKey = process.env.OPEN_AI_KEY;
const openai = new OpenAI({ apiKey: apiKey });
const liverpooldata = `[
  The current Liverpool squad of 2024/25 has:
  Manager: Arne Slot. Age: 45. Nationality: Dutch.
  Player: Alisson Becker. National team: Brazil. He is right-footed.
  Player: Caoimhín Kelleher. National team: Ireland. He is right-footed.
  Player: Fabian Mrozek. National team: Poland.
  Player: Marcelo Pitaluga. National team: Brazil.
  Player: Vitezslav Jaros. National team: Czech Republic.
  Player: Adrián. National team: Spain. He is right-footed.
  Player: Ibrahima Konaté. National team: France. He is right-footed.
  Player: Virgil van Dijk. National team: Netherlands. He is right-footed.
  Player: Joe Gomez. National team: England. He is right-footed.
  Player: Jarell Quansah. National team: England. He is right-footed.
  Player: Andy Robertson. National team: Scotland. He is left-footed.
  Player: Konstantinos Tsimikas. National team: Greece. He is left-footed.
  Player: Trent Alexander-Arnold. National team: England. He is right-footed.
  Player: Conor Bradley. National team: Northern Ireland. He is right-footed.
  Player: Wataru Endo. National team: Japan. He is right-footed.
  Player: Luke Chambers. National team: England. 
  Player: Stefan Bajcetic. National team: Spain. He is right-footed.
  Player: Amara Nallo. National team: England.
  Player: Owen Beck. National team: Wales.
  Player: James McConnell. National team: England.
  Player: Bobby Clark. National team: England. He is right-footed.
  Player: Dominik Szoboszlai. National team: Hungary. He is right-footed.
  Player: Alexis Mac Allister. National team: Argentina. He is right-footed.
  Player: Lewis Koumas. National team: Wales.
  Player: Calum Scanlon. National team: England. 
  Player: Trey Nyoni. National team: England.
  Player: Ryan Gravenberch. National team: Netherlands. He is right-footed.
  Player: Curtis Jones. National team: England. He is right-footed.
  Player: Harvey Elliott. National team: England. He is left-footed.
  Player: Luis Díaz. National team: Colombia. He is right-footed.
  Player: Cody Gakpo. National team: Netherlands. He is right-footed.
  Player: Diogo Jota. National team: Portugal. He is right-footed.
  Player: Mohamed Salah. National team: Egypt. He is left-footed.
  Player: Ben Doak. National team: Scotland. He is right-footed.
  Player: Kaide Gordon. National team: England.
  Player: Jayden Danns. National team: England.
  Player: Thomas Hill. National team: Wales.
  Player: Darwin Nunez. National team: Uruguay. He is right-footed.

  Liverpool are in the Champions League for the 2024/25 season.
  Arne Slot is our manager. He is Dutch.

  These results for the 2023/24 season (last season) are:
  On 13 August 2023 in the Premier League at Home. Liverpool drew against Chelsea. The score was 1 - 1. The game was played on a Sunday and the referee was Anthony Taylor. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 35%. Luis Diaz scored in the 18th minute with an assist from Mohamed Salah. Axel Disasi scored for Chelsea in the 37th minute with an assist from Ben Chilwell.
  On 19 August 2023 in the Premier League at Home. Liverpool won against Bournemouth. The score was 3 - 1. The game was played on a Saturday and the referee was Thomas Bramall. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 64%. Antoine Semenyo scored for Bournemouth in the 3rd minute with an assist from Dominic Solanke. Luis Diaz scored in the 27th minute. Mohamed Salah scored in the 36th minute. Mohamed Salah missed a penalty in the 36th minute. Alexis Mac Allister was sent off for Liverpool in the 58th minute. Diogo Jota scored in the 62nd minute.
  On 27 August 2023 in the Premier League Away. Liverpool won against Newcastle Utd. The score was 2 - 1. The game was played on a Sunday and the referee was John Brooks. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 41%. Anthony Gordon scored for Newcastle in the 25th minute. Virgil van Dijk was sent off for Liverpool in the 28th minute. Darwin Nunez scored in the 81st minute. Darwin Nunez scored again in the 93rd minute with an assist from Alexis Mac Allister.
  On 03 September 2023 in the Premier League at Home. Liverpool won against Aston Villa. The score was 3 - 0. The game was played on a Sunday and the referee was SiMonday Hooper. Our captain was Trent Alexander-Arnold. We played a 4-3-3 formation and our possession was 63%. Dominik Szoboszlai scored in the 3rd minute with an assist from Trent Alexander-Arnold. Matty Cash scored an own goal in the 22nd minute to make it 2-0 to Liverpool. Mohamed Salah scored in the 55th minute with an assist from Darwin Nunez.
  On 16 September 2023 in the Premier League Away. Liverpool won against Wolves. The score was 3 - 1. The game was played on a Saturday and the referee was Michael Oliver. Our captain was Andy Robertson. We played a 4-3-3 formation and our possession was 65%. Hwang Hee-chan scored for Wolves in the 7th minute with an assist from Pedro Neto. Cody Gakpo scored in the 55th minute with an assist from Mohamed Salah. Andy Robertson scored in the 85th minute with an assist from Mohamed Salah. Hugo Bueno scored an own goal in the 91st minute to make it 3-1 to Liverpool.
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
  On 17 February 2024 in the Premier League Away. Liverpool won against Brentford. The score was 4 - 1. The game was played on a Saturday and the referee was Michael Oliver. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 62%. Darwin Nunez scored a goal in the 35th minute with a Diego Jota assist. Alexis Mac Allister scored a goal in the 55th minute with a Mo Salah assist. Mohamed Salah scored a goal in the 68th minute with a Cody Gakpo assist. Ivan Toney scored a goal in the 75th minute. Cody Gakpo scored a goal in the 86th minute with a Luis Diaz assist.
  On 21 February 2024 in the Premier League at Home. Liverpool won against Luton. The score was 4 - 1. The game was played on a Wednesday and the referee was Andy Madley. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 60%. Chiedozie Ogbene scored for Brentford in the 12th minute. Virgil van Dijk scored in the 56th minute with an Alexis Mac Allister assist. Cody Gakpo scored in the 58th minute with an Alexis Mac Allister assist. Luis Diaz scored in the 71st minute with an Andy Robertson assist. Harvey Elliott scored in the 90th minute.
  On 25 Februrary 2024 in the EFL Cup final at Wembley. Liverpool won against Chelsea. The score was 1 - 0 after extra-time. The game was played on a Sunday and the referee was Chris Kavanagh. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 54%. Virgil van Dijk scored in he 118th minute with an assist from Kostas Tsimikas. Liverpool won the EFL cup as a result! 
  On 28 February 2024 in the FA Cup Fifth round proper at Home. Liverpool won against Southampton. The score was 3 - 0. The game was played on a Wednesday and the referee was Craig Pawson. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 52%. Lewis Koumas scored in the 44th minute with an assist from Bobby Clark. Jayden Danns scored in the 88th minute. Jayden Danns scored again in the 90th minute with an assist from Cody Gakpo.
  On 02 March 2024 in the Premier League Away. Liverpool won against Nottingham Forest. The score was 1 - 0. The game was played on a Saturday and the referee was Paul Tierney. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 69%. Darwin Nunez scored in the 99th minute, which is our latest ever goal, with an assist from Alexis Mac Allister.
  On 07 March 2024 in the Europa League Round of 16 Away. Liverpool won against Sparta Prague. The score was 5 - 1. The game was played on a Thursday and the referee was Jose Sanchez. Our captain was Andy Robertson. We played a 4-3-3 formation and our possession was 62%. Alexis Mac Allister scored a penalty in the 6th minute. Darwin Nunez scored in the 25th minute with an assist from Harvey Elliott. Darwin Nunez scored again in the 45(+3)th minute with an assist from Alexis Mac Allister. Conor Bradley scored an own goal in the 46th minute. Luis Diaz scored in the 53rd minute with an assist from Harvey Elliott. Dominik Szoboszlai scored in the 94th minute with an assist from Harvey Elliott.
  On 10 March 2024 in the Premier League at Home. Liverepool drew against Manchester City. The score was 1 - 1. The game was played on a Sunday and the referee was Michael Oliver. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 53%. John Stones scored for Manchester City in the 23rd minute with an assist from Kevin De Bruyne. Alexis Mac Allister scored a penalty in the 50th minute.
  On 14 March 2024 in the Europa League Round of 16 at Home. Liverpool won against Sparta Prague. The score was 6 - 1 (11 - 2 on aggregrate). The game was played on a Thursday and the referee was Artur Soares Dias. Our captain was Andy Robertson. We played a 4-3-3 formation and our possession was 77%. Darwin Nunez scored in the 7th minute with an assist from Dominik Szoboszlai. Bobby Clark scored in the 8th minute with an assist from Mohamed Salah. Mohamed Salah scored in the 10th minute with an assist from Bobby Clark. Cody Gakpo scored in the 14th minute with an assist from Mohamed Salah. Veljko Birmančević scored for Sparta Prague in the 42nd minute with an assist from Ángelo Preciado. Dominik Szoboszlai scored in the 48th minute with an assist from Mohamed Salah. Cody Gakpo scored again in the 55th minute with an assist from Harvey Elliott. 
  On 17 March 2024 in the FA Cup Quarter Finals Away. Liverpool lost to Manchester United after extra time. The score was 4 - 3. The game was played on a Sunday and the referee was John Brooks. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 59%. Scott McTominay scored for Manchester United in the 10th minute. Alexis Mac Allister scored in the 44th minute with an assist from Darwin Nunez. Salah scored in the 45(+2) minute. Antony scored for Manchester United in the 87th minute. Harvey Elliott scored in the 105th minute of extra time with an assist from Connor Bradley. Marcus Rashford scored for Manchester United in the 112th minute of extra time. Amad Diallo scored in the 120(+1) minute of extra time with an assist from Alejandro Garnacho. This result means that Liverpool are unfortunately knocked out of the FA Cup.
  On 31 March 2024 in the Premier League at Home. Liverpool won against Brighton. The score was 2 - 1. The game was played on a Sunday and the referee was David Coote. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 55%. Danny Welbeck scored for Brighton in the 2nd minute. Luis Diaz scored in the 27th minute. Mohamed Salah scored in the 65th minute with an assist from Alexis Mac Allister.
  On 4 April 2024 in the Premier League at Home, Liverpool won against Sheffield United. The score was 3 - 1. The game was played on a Thursday. The referee was Stuart Atwell. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 83%, which set a new Premier League record for possession percentage in a game. Darwin Nunez scored in the 17th minute. Conor Bradley scored an own goal in the 58th minute to make it 1 - 1. Alexis Mac Allister scored a beautiful goal in the 76th minute with an assist from Luis Diaz. Cody Gakpo scored in the 90th minute with an assist from Andy Robertson.
  On 7 April 2024 in the Premier League Away, Liverpool drew against Manchester United. The score was 2 - 2. The game was played on a Sunday. The referee was Anthony Taylor. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 62%. Luis Diaz scored in the 23rd minute with an assist from Darwin Nunez. Bruno Fernandes scored for Manchester United in the 50th minute. Kobbie Mainoo scored for Manchester United in the 67th minute with an assist from Aaron Wan-Bissaka. Mohamed Salah scored a penalty in the 84th minute, which was won by Harvey Elliott. 
  On 11 April 2024 in the Europa League Quarter Finals first leg at Home, Liverpool lost against Atalanta. The score was 0-3. The game was played on a Thursday. The referee was Halil Umut Meler. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 69%. Gianluca Scamacca scored in the 38th minute and then again in the 60th minute. Mario Pašalić scored in the 83rd minute. 
  On 14 April 2024 in the Premier League at Home, Liverpool lost against Crystal Palace. The score was 0-1. The game was played on a Sunday. The referee was Chris Kavanagh. Our captain was Virgil van Dijk. We played a 4-3-3 formation and our possession was 69%. Eberechi Eze scored for Crystal Palace in the 14th minute. 
  On 17 April 2024 in the Europa League Away, Liverpool won against Atalanta. The score was 1-0 (3-1 to Atalanta on aggregrate). The game was played on a Thursday. The referee was François Letexier. Our captain was Virgil van Dijk and our possession was 69%. Mohamed Salah scored a penalty in the 7th minute. Liverpool were knocked out of the Europa League with this defeat.
  On 21 April 2024 in the Premier League Away, Liverpool won against Fulham. The score was 3-1. The gam was played on a Sunday. The referee was Craig Pawson. Our captain was Virgil van Dijk and our possession was 60%. Trent Alexander-Arnold scored in the 32nd minute. Timothy Castagne equalised for Fulham in the 45(+2) minute. Ryan Gravenberch scored in the 53rd minute with an assist from Harvey Elliott. Diogo Jota scored in the 72nd minute with an assist from Cody Cakpo.
  On 24 April 2024 in the Premier League Away, Liverpool lost against Everton. The score was 2-0. The game was played on a Wednesday. The referee was Andy Madley. Our captain was Virgil van Dijk and our possession was 75%. Jarrad Branthwaite scored in the 27th minute and Dominic Calvert-Lewin scored in the 58th minute.
  On 27 April 2024 in the Premier League Away, Liverpool drew against West Ham. The score was 2-2. The game was played on a Saturday. The referee was Anthony Taylor. Our captain was Virgil van Dijk and our possession was 71%. Jarrod Bowen scored in the 43rd minute. Andrew Robertson scored in the 48th minute with an assist from Luis Diaz. Alphonse Areola scored an own goal in the 65th minute to make it 2-1 to Liverpool. Michail Antonio scored in the 77th minute.
  On 4 May 2024 in the Premier League at Home, Liverpool won against Tottenham. The score was 4-2. The game was played on a Sunday. The referee was Paul Tierney. Our captain was Virgil van Dijk and our possession was 44%. Mohamed Salah scored in the 16th minute with an assist from Cody Gakpo. Andrew Robertson scored in the 45th minute. Cody Gakpo scored in the 50th minute with an assist from Harvey Elliott. Harvey Elliott scored in the 59th minute with an assist from Mohamed Salah. Richarlison scored for Tottenham in the 72nd minute and Son Heung-min scored in the 77th minute.
  On 11 May 2024 in the Premier League Away, Liverpool drew against Aston Villa. The score was 3-3. The game was played on a Monday. The referee was Simon Hooper. Our captain was Virgil van Dijk and our possession was 59%. Emiliano Martínez scored an own goal in the 2nd minute to make it 1-0 to Liverpool. Youri Tielemans scored in the 12th minute. Cody Gakpo scored in the 23rd minute. Jarell Quansah scored in the 48th minute with an assist from Harvey Elliott. Jhon Durán then scored in the 85th minute and again in the 88th minute.  
  On 19 May 2024 in the Premier League at Home, Liverpool won against Wolves. The score was 2-0. The game was played on a Sunday. The referee was Chris Kavanagh. Our captain was Virgil van Dijk and our possession was 67%. Alexis Mac Allister scored in the 34th minute with an assist from Harvey Elliott. Jarell Quansah scored in the 40th minute.
  Liverpool finished 3rd in the Premier League with 82 points.
  ].`;

export async function GET() {
  let shootingData: ShootingData[] = [];
  let defensiveData: DefensiveData[] = [];
  let goalkeepingData: GoalkeepingData[] = [];
  let standardData: StandardData[] = [];

  const response = await axios.get(
    "https://fbref.com/en/squads/822bd0ba/2023-2024/all_comps/Liverpool-Stats-All-Competitions"
  );
  const html = response.data;
  const $ = cheerio.load(html);
  const standardStats = $("#switcher_stats_standard tbody");
  const shootingStats = $("#switcher_stats_shooting tbody");
  const defensiveStats = $("#switcher_stats_defense tbody");
  const goalkeepingStats = $("#switcher_stats_keeper tbody");
  const standard = new Set();
  const shooting = new Set();
  const defense = new Set();
  const goalkeeping = new Set();

  $("tr", standardStats).each((index, element) => {
    const playerName = $('th[data-stat="player"] a', element).text().trim();

    if (!standard.has(playerName)) {
      const assists = $('td[data-stat="assists"]', element).text().trim();
      const starts = $('td[data-stat="games_starts"]', element).text().trim();
      const minutesPlayed = $('td[data-stat="minutes"]', element).text().trim();
      const expectedGoals = $('td[data-stat="xg"]', element).text().trim();
      const age = $('td[data-stat="age"]', element).text().trim().slice(0, 2);
      const position = $('td[data-stat="position"]', element).text().trim();
      const games = $('td[data-stat="games"]', element).text().trim();

      standardData.push({
        name: playerName,
        assists: assists,
        starts: starts,
        minutesPlayed: minutesPlayed,
        expectedGoals: expectedGoals,
        age: age,
        position: position,
        games: games,
      });
      standard.add(playerName);
    }
  });

  $("tr", shootingStats).each((index, element) => {
    const playerName = $('th[data-stat="player"] a', element).text().trim();

    if (!shooting.has(playerName)) {
      const playerGoals = $('td[data-stat="goals"]', element).text().trim();
      const playerShots = $('td[data-stat="shots"]', element).text().trim();
      const playerShotsOnTarget = $('td[data-stat="shots_on_target"]', element)
        .text()
        .trim();

      shootingData.push({
        name: playerName,
        goals: playerGoals,
        shots: playerShots,
        shotsOnTarget: playerShotsOnTarget,
      });
      shooting.add(playerName);
    }
  });

  $("tr", defensiveStats).each((index, element) => {
    const playerName = $('th[data-stat="player"] a', element).text().trim();

    if (!defense.has(playerName)) {
      const playerTackles = $('td[data-stat="tackles"]', element).text().trim();
      const playerTacklesWon = $('td[data-stat="tackles_won"]', element)
        .text()
        .trim();
      const playerInterceptions = $('td[data-stat="interceptions"]', element)
        .text()
        .trim();

      defensiveData.push({
        name: playerName,
        tackles: playerTackles,
        tacklesWon: playerTacklesWon,
        interceptions: playerInterceptions,
      });
      defense.add(playerName);
    }
  });

  $("tr", goalkeepingStats).each((index, element) => {
    const playerName = $('th[data-stat="player"] a', element).text().trim();

    if (!goalkeeping.has(playerName)) {
      const cleanSheets = $('td[data-stat="gk_clean_sheets"]', element)
        .text()
        .trim();
      const savePercentage = $('td[data-stat="gk_save_pct"]', element)
        .text()
        .trim();
      const saves = $('td[data-stat="gk_saves"]', element).text().trim();
      const goalsConceded = $('td[data-stat="gk_goals_against"]', element)
        .text()
        .trim();

      goalkeepingData.push({
        name: playerName,
        cleanSheets: cleanSheets,
        savePercentage: savePercentage,
        saves: saves,
        goalsConceded: goalsConceded,
      });
      goalkeeping.add(playerName);
    }
  });
  return Response.json({
    shootingData,
    defensiveData,
    goalkeepingData,
    standardData,
  });
}

export async function POST(req: Request) {
  const recentData = (await axios.get("https://chat-lfc.vercel.app/api/openai"))
    .data;
  const standardData = recentData.standardData.map(
    ({
      name,
      assists,
      starts,
      minutesPlayed,
      expectedGoals,
      position,
      age,
      games,
    }: StandardData) =>
      `${name} is ${age} years old. He playes the ${position} position. He has played ${minutesPlayed} minutes this season and has started ${starts} games. He has played ${games} games in total. He has ${assists} assists and ${expectedGoals} expected goals.`
  );
  const shootingData = recentData.shootingData.map(
    ({ name, goals, shots, shotsOnTarget }: ShootingData) =>
      `This season, ${name} has had ${shots} shots, ${shotsOnTarget} were on target, and ${goals} were goals.`
  );
  const defensiveData = recentData.defensiveData.map(
    ({ name, tackles, tacklesWon, interceptions }: DefensiveData) =>
      `This season, ${name} has made ${tackles} tackles and won ${tacklesWon} tackles. They also made ${interceptions} interceptions.`
  );
  const goalkeepingData = recentData.goalkeepingData.map(
    ({
      name,
      cleanSheets,
      savePercentage,
      saves,
      goalsConceded,
    }: GoalkeepingData) =>
      `This season, ${name} has ${cleanSheets} clean sheets. He has also made ${saves} saves and has a ${savePercentage} save percentage. ${name} has conceded ${goalsConceded} goals.`
  );
  const { question } = await req.json();
  const response = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "You love Liverpool FC. Your name is Darwizzy and you have a cheeky but endearing personality. You have latin and scouse humour. When you are asked a question about Liverpool's results, fixtures, players and statistics use the information provided to answer questions and also show your personality in the responses you provide. GK means Goalkeeper, DF means defence, FW means forward, MF means midfield. Do not give subjective opinions if you are unsure of the answer. If you can not find the answer politely acknowledge the limitation and suggest asking another question related to Liverpool FC. Keep your answers to fewer than 200 words. Provide the stats you have about a certain player, when asked. For example, for a goalkeeper, provide goalkeeper data. For the outfield players, provide general, attacking, and defensive stats.",
      },
      {
        role: "user",
        content: `${liverpooldata} ${standardData} ${shootingData} ${defensiveData} ${goalkeepingData} ${question}`,
      },
    ],
    temperature: 0.3,
    model: "gpt-3.5-turbo",
    max_tokens: 300,
  });
  return new Response(JSON.stringify(response));
}
