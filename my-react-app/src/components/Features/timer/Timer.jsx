// Component display timer UI and buttons
//Use the timer logic hook to control stopwatch

import useTimerLogic from "./timerLogic";
import Button from "../../ui/Button";
import SessionModal from "../sessionModal/sessionModal";
import "./Timer.css";
import { useRef, useState } from "react";

export default function Timer() {
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
        <Button
          onClick={startTimer}
          disabled={isRunning}
          text="Start"
          l
          variant="primary"
        />
        <Button
          onClick={pauseTimer}
          disabled={!isRunning}
          text="Pause"
          variant="secondary"
        />
        {/* Session modal med handleClose för att stänga loggen*/}
        <SessionModal
          dialogRef={dialogRef}
          stopTimeFormatted={stopTimeFormatted}
          handleCloseModal={handleCloseModal}
        />
        <Button
          onClick={() =>
            handleStopClick(
              formattedMinutes,
              formattedSeconds,
              formattedHundredths,
            )
          }
          disabled={!hasStarted}
          text="Stop"
          variant="primary"
        />
      </div>
    </div>
  );
}
