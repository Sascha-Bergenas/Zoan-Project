import { useEffect, useMemo, useState } from "react";
import { quotes } from "./quotes";
import "./RandomQuote.css";

type RandomQuoteProps = {
  size?: string;
};

export default function RandomQuote({ size = "16px" }: RandomQuoteProps) {
  const [quote, setQuote] = useState<string>("");

  useEffect(() => {
    const index = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[index]);
  }, []);

  return (
    <div>
      <p className="random-quote" style={{ fontSize: size }}>
        {quote}
      </p>
    </div>
  );
}
