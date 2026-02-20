import React, { useState } from "react";

const SmartRecommendations = () => {
  const [userInput, setUserInput] = useState("");
  const [mode, setMode] = useState("");
  const [comment, setComment] = useState("");

  const getRecommendation = async () => {
    try {
      const res = await fetch("http://localhost:5000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput }),
      });
      const text = await res.text();
      const [m, c] = text.split("–").map((s) => s.trim());
      setMode(m);
      setComment(c || "");
    } catch (err) {
      console.error(err);
      setMode("Deep Work");
      setComment("Fel vid generering av rekommendation.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Smart Work Mode Recommendation</h2>
      <textarea
        placeholder="Skriv hur du känner dig eller din situation"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        rows={2}
      />
      <br />
      <button onClick={getRecommendation}>Få rekommendation</button>
      <p>
        <strong>Mode:</strong> {mode}
      </p>
      <p>{comment}</p>
    </div>
  );
};

export default SmartRecommendations;
