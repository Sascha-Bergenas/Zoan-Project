// Custom hook that contains all stopwatch behavior
// It handles starting, pausing, stopping and tracking elapsed time

import { useState, useEffect, useRef } from "react";

export default function useTimerLogic() {
  const [time, setTime] = useState(0); // Time showed on page
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  //Store values that should stay between renders
  //without causing component re-renders
  const startTimeRef = useRef(null); // when current run starts
  const elapsedRef = useRef(0); // time elapsed before resume

  function startTimer() {
    // set start time, timer will resume from paused state
    startTimeRef.current = Date.now() - elapsedRef.current;
    setIsRunning(true);
    setHasStarted(true);
    console.log("Start:", new Date(startTimeRef.current).toLocaleString());
  }

  function pauseTimer() {
    // save elapsed time so timer can continue later
    elapsedRef.current = Date.now() - startTimeRef.current;
    setIsRunning(false);
  }

  function stopTimer() {
    //Reset timer to initial state
    setIsRunning(false);
    setTime(0);
    elapsedRef.current = 0;
    setHasStarted(false);
    console.log("Stop:", new Date(Date.now()).toLocaleString());
  }

  useEffect(() => {
    //only run interval while timer is active
    if (!isRunning) return;

    //Update displayted time using timestamps
    const interval = setInterval(() => {
      setTime(Date.now() - startTimeRef.current);
    }, 10);

    //Clear interval when timer stops or unmounts
    return () => clearInterval(interval);
  }, [isRunning]);

  return {
    time,
    startTimer,
    pauseTimer,
    stopTimer,
    isRunning,
    hasStarted,
  };
}
