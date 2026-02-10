import { useEffect, useMemo, useState } from "react";

export default function RandomQuote() {
  const quotes = useMemo(
    () => [
      "Do one thing well.",
      "Progress over perfection.",
      "Small steps add up.",
    ],
    [],
  );

  const [quote, setQuote] = useState<string>("");

  useEffect(() => {
    const index = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[index]);
  });

  return (
    <div>
      <p>{quote}</p>
    </div>
  );
}
