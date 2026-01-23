import { useState, useEffect } from "react";

export default function useTimerLogic() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  function startTimer() {
    setIsRunning(true);
  }

  function pauseTimer() {
    setIsRunning(false);
  }

  function stopTimer() {
    setIsRunning(false);
    setTime(0);
  }

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return {
    time,
    startTimer,
    pauseTimer,
    stopTimer,
  };
}
