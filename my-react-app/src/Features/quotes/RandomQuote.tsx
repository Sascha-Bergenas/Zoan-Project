import { useEffect, useMemo, useState } from "react";
import { quotes } from "./quotes";

export default function RandomQuote() {
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
