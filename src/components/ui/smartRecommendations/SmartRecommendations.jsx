import React, { useState } from "react";
import Button from "../button/Button";
import TextArea from "../textArea/TextArea";
import "./smartRecommendations.css";

const SmartRecommendations = () => {
  const [userInput, setUserInput] = useState("");
  const [mode, setMode] = useState("");
  const [comment, setComment] = useState("");
  const [time, setTime] = useState("");

  const getRecommendation = async () => {
    try {
      const res = await fetch("http://localhost:5000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput })
      });

      const text = await res.text();

      if (text === "IRRELEVANT") {
        setMode("Skriv hur du mår!");
        setTime("");
        setComment("T.ex. 'jag är trött' eller 'jag känner mig pigg'.");
        return;
      }

      const parts = text.split("-").map((s) => s.trim()); //splits string into an array every time it hits a "-"

      setMode(parts[0] || "");
      setTime(parts[1] || "");
      setComment(parts[2] || "");
    } catch (err) {
      console.error(err);
      setMode("Deep Work");
      setComment("Fel vid generering av rekommendation.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h3>Smarta rekommendationer</h3>
      <TextArea
        className="smart-textArea"
        placeholder="Skriv hur ditt humör är idag och få en rekommendation."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <Button text="Få rekommendation" onClick={getRecommendation}>
        Få rekommendation
      </Button>
      {(mode || time || comment) && ( // only shows results div if one of the three has a value
        <div style={{ marginTop: "16px" }}>
          <div className="pb-1">
            {mode && <h4> {mode}</h4>}
            {time && <p>Föreslagen arbetstid: {time}</p>}
          </div>
          <span className="text-bold">Tips:</span>{" "}
          {comment && <p> {comment}</p>}
        </div>
      )}
    </div>
  );
};

export default SmartRecommendations;
