import express from "express"; //create server and define routes
import fetch from "node-fetch"; //lets server make https requests
import cors from "cors"; // allwaos react forntend to talk to  your server
import dotenv from "dotenv"; // lets server read the env file

dotenv.config(); //loads .env file so key is accessible
const app = express(); // creates server
app.use(cors()); // tells the server to accept requests from your react frontend
app.use(express.json()); //tells the server to understand json data that gets sent

app.post("/recommend", async (req, res) => {
  //creates an endpoint that listens for POST requests at http://localhost:5000/recommend
  const { userInput } = req.body; //grabs the userInput text that react sent over

  try {
    const response = await fetch(
      // sends the request and waits for the response
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          //metadata
          Authorization: `Bearer ${process.env.OPENROUTER_KEY}`, // reads env file for API key. OpenRouter reads headers first to verify auth
          "Content-Type": "application/json", // sending json data
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: `Du får ett meddelande från en användare. Klassificera det som antingen "Deep Work" eller "Chill".

Klassificera som "Chill" om meddelandet innehåller något av: trött, trött, seg, orkeslös, stressad, jobbig, tung, svår, överväldigad, inte orkar, behöver paus, har ont, mår dåligt, ledsen, ångest.

Klassificera som "Deep Work" om meddelandet innehåller något av: pigg, energisk, fokuserad, motiverad, redo, stark, bra, glad, sugen.

För Deep Work, föreslå mellan 25-90 min baserat på hur energisk användaren verkar.
För Chill, föreslå mellan 10-30 min baserat på hur trött användaren verkar.

Om meddelandet inte passar in på något av ovanstående, välj "Chill".

Användarens meddelande: "${userInput}" /* From userinput state */

Svara i exakt detta format och inget annat:
<Mode> - <tid> min - <kort tips på svenska>`,
            },
          ],
          max_tokens: 80,
        }),
      },
    );

    const data = await response.json();
    console.log("OpenRouter response:", data);

    const recommendation =
      data?.choices?.[0]?.message?.content?.trim() || "Deep Work – Kör på!";
    res.send(recommendation);
  } catch (err) {
    console.error(err);
    res.status(500).send("Deep Work – Fel vid generering av rekommendation.");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
