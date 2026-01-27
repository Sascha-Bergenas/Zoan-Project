// Component display timer UI and buttons
//Use the timer logic hook to control stopwatch

import useTimerLogic from "./timerLogic";
import Button from "../../ui/Button";
import SessionModal from "../sessionModal/sessionModal";
import "./Timer.css";
import { useRef, useState } from "react";

export default function Timer() {
  //get timer state and control functions from custom hook
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
  function calcTime(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const hundredths = Math.floor((time % 1000) / 10);

    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    const formattedHundredths = hundredths < 10 ? "0" + hundredths : hundredths;

    return {
      formattedMinutes: minutes < 10 ? "0" + minutes : String(minutes),
      formattedSeconds: seconds < 10 ? "0" + seconds : String(seconds),
      formattedHundredths:
        hundredths < 10 ? "0" + hundredths : String(hundredths),
    };
  }

  //format current time value for rendering
  const { formattedMinutes, formattedSeconds, formattedHundredths } =
    calcTime(time);

  return (
    <div className="timer-fill">
      <div className="stopwatch">
        {/* Progress ring uses css variable to show time progress */}
        <div className="ring" style={{ "--p": (time % 60000) / 60000 }}>
          <div className="ticks" />
          <div className="ring-inner">
            <div className="time-text">
              {formattedMinutes}:{formattedSeconds}
              <span className="milliseconds text-md">
                :{formattedHundredths}
              </span>
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
