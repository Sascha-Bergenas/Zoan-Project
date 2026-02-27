import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommend", async (req, res) => {
  const { userInput } = req.body;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_KEY}`, // reads env file for API key. OpenRouter reads headers first to verify auth
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          messages: [
            {
              role: "user",
              content: `Du får ett meddelande från en användare.

Först: Handlar meddelandet om hur användaren mår eller känner sig just nu?
Om NEJ, svara bara med ordet: IRRELEVANT

Om JA, klassificera som "Deep Work" eller "Chill":
- "Chill" om användaren verkar trött, stressad, ledsen eller orkeslös
- "Deep Work" om användaren verkar pigg, motiverad eller energisk

För Deep Work, föreslå ett tal mellan 25 och 90 min baserat på hur energisk användaren verkar.
För Chill, föreslå ett tal mellan 10 och 30 min baserat på hur trött användaren verkar.

Ge ett kort, kreativt och oväntat tips. Det ska inte vara det första du tänker på.

Användarens meddelande: "${userInput}"

Svara i exakt ett av dessa format:
IRRELEVANT
eller
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
      data?.choices?.[0]?.message?.content?.trim() || "Deep Work - Kör på!"; //if it exists, keep going (optional chaining)
    res.send(recommendation);
  } catch (err) {
    console.error(err);
    res.status(500).send("Deep Work - Fel vid generering av rekommendation.");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
