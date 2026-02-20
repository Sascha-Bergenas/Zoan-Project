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
          Authorization: `Bearer ${process.env.OPENROUTER_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: [
            {
              role: "user",
              content: `Användarens meddelande: "${userInput}". Läs användarens känsla och situation, och välj det bästa arbetssättet från: Deep Work, Möte, Chill. Rekommendera möte om möte nämns.
Skriv alltid ett kort uppmuntrande eller beskrivande meddelande på svenska efter mode-namnet, även om det är kort. Format: <Mode> – <Kort kommentar>.`,
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
