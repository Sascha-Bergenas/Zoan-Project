// Component display timer UI and buttons
//Use the timer logic hook to control stopwatch

import { useState } from "react";
import useTimerLogic from "./timerLogic";
import Button from "../../ui/Button";
import "./Timer.css";

export default function Timer() {
  const [selectedMode, setSelectedmode] = useState(null);

  const { time, startTimer, pauseTimer, stopTimer, isRunning, hasStarted } =
    useTimerLogic();

  //Converts ms to formatted time values to display on page
  function calcTime(ms) {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);

    return {
      formattedHours: hours.toString().padStart(2, "0"),
      formattedMinutes: minutes.toString().padStart(2, "0"),
      formattedSeconds: seconds.toString().padStart(2, "0"),
    };
  }

  //format current time value for rendering
  const result = calcTime(time);

  const formattedHours = result.formattedHours;
  const formattedMinutes = result.formattedMinutes;
  const formattedSeconds = result.formattedSeconds;

  function handleModeSelect(mode) {
    setSelectedmode(mode);
  }

  return (
    <div className="timer-fill">
      <div className="stopwatch">
        {/* Progress ring uses css variable to show time progress */}
        <div className="ring" style={{ "--p": (time % 60000) / 60000 }}>
          <div className="ticks" />
          <div className="ring-inner">
            <div className="time-text">
              {formattedHours}:{formattedMinutes}:{formattedSeconds}
              <p>{selectedMode}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Timer control buttons */}
      <div className="timer-buttons">
        {!isRunning && hasStarted && (
          <>
            <Button onClick={startTimer} text="Start" variant="primary" />
          </>
        )}

        {isRunning && (
          <>
            <Button onClick={pauseTimer} text="Pause" variant="secondary" />
          </>
        )}

        {hasStarted && (
          <Button
            onClick={stopTimer}
            disabled={!hasStarted}
            text="Stop"
            variant="primary"
          />
        )}

        {!hasStarted && (
          <>
            <Button
              onClick={() => handleModeSelect("deep")}
              text="Deep Work"
              variant="primary"
            />

            <Button
              onClick={() => handleModeSelect("meeting")}
              text="Möte"
              variant="secondary"
            />
            <Button
              onClick={() => handleModeSelect("chill")}
              text="Chill"
              variant="secondary"
            />
          </>
        )}

        {!hasStarted && (
          <Button
            onClick={startTimer}
            disabled={selectedMode === null}
            text="Starta Session"
            variant="primary"
          />
        )}
      </div>
    </div>
  );
}
