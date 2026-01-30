// Component display timer UI and buttons
//Use the timer logic hook to control stopwatch

import { useState } from "react";
import useTimerLogic from "./timerLogic";
import Button from "../../ui/Button";
import SessionModal from "../sessionModal/sessionModal";
import "./Timer.css";
import { useRef, useState } from "react";

export default function Timer() {
  const [selectedMode, setSelectedmode] = useState(null);

  const { time, startTimer, pauseTimer, stopTimer, isRunning, hasStarted } =
    useTimerLogic();

  //ref för modal dialog element
  const dialogRef = useRef(null);

  const [stopTimeFormatted, setStopTimeFormatted] = useState("");

  //Funktion med stopTimer för att öppna modal vid timer stopp
  const handleStopClick = (
    formattedMinutes,
    formattedSeconds,
    formattedHundredths,
  ) => {
    const formattedTime = `${formattedMinutes}:${formattedSeconds},${formattedHundredths}`;
    console.log(formattedTime);
    setStopTimeFormatted(formattedTime);
    console.log(stopTimeFormatted);
    stopTimer();
    dialogRef.current.showModal();
  };

  const handleCloseModal = () => {
    dialogRef.current.close();
  };

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

  function resetModeSelect() {
    setSelectedmode(null);
  }

  function stopResetMode() {
    stopTimer();
    resetModeSelect();
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
            onClick={() => stopResetMode()}
            disabled={!hasStarted}
            text="Stop"
            variant="primary"
          />
        )}
        {!hasStarted && selectedMode === null && (
          <>
            <p style={{ fontSize: "text-sm" }}>Välj Work mode</p>
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
        {selectedMode !== null && !hasStarted && (
          <>
            <p>Starta en ny session och påbörja timern.</p>
            <Button
              onClick={startTimer}
              disabled={selectedMode === null}
              text="Starta Session"
              variant="primary"
            />
            <Button
              onClick={() => {
                resetModeSelect();
              }}
              disabled={selectedMode === null}
              text="Återgå"
              variant="primary"
            />
          </>
        )}
        <p>{selectedMode}</p> {/* Test only */}
      </div>
    </div>
  );
}
