/**
 * Custom react hook for timer functionality.
 *
 * Handles starting, pausing, stopping, and tracking time.
 *
 * @returns {{
 *   time: number,
 *   startTimer: Function,
 *   pauseTimer: Function,
 *   stopTimer: Function,
 *   isRunning: boolean,
 *   hasStarted: boolean
 * }}
 */

import { useState, useEffect, useRef } from "react";

export default function useTimerLogic() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const startTimeRef = useRef(null);
  const elapsedRef = useRef(0);

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
    if (!isRunning) return;

    //Update displayted time using timestamps
    const interval = setInterval(() => {
      setTime(Date.now() - startTimeRef.current);
    }, 10);

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
