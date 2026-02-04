import { useRef, useState } from "react";
import Button from "../../components/ui/Button";
import SessionModal from "../modals/sessionModal/sessionModal";
import "./Timer.css";

export default function Timer({ timer }) {
  const [selectedMode, setSelectedmode] = useState(null);

  const {
    time,
    startTimer,
    pauseTimer,
    stopTimer,
    isRunning,
    hasStarted,
    getStartedTime,
  } = timer;

  const dialogRef = useRef(null);

  const [timerData, setTimerData] = useState(null);

  const [stopTimeFormatted, setStopTimeFormatted] = useState("");

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

  const handleStopClick = () => {
    const formattedTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    const startedAt = getStartedTime();

    const data = {
      activeTime: time,
      startedAt,
      endedAt: Date.now(),
    };

    setTimerData(data);
    setStopTimeFormatted(formattedTime);
    stopTimer();
    dialogRef.current.showModal();
  };

  const handleCloseModal = () => {
    dialogRef.current.close();
    resetModeSelect();
  };

  return (
    <div className="timer-fill">
      <SessionModal
        dialogRef={dialogRef}
        stopTimeFormatted={stopTimeFormatted}
        handleCloseModal={handleCloseModal}
        timerData={timerData}
      />

      <div className="stopwatch">
        <div className="ring" style={{ "--p": (time % 60000) / 60000 }}>
          <div className="ticks" />
          <div className="ring-inner">
            <div className="time-text">
              {formattedHours}:{formattedMinutes}:{formattedSeconds}
            </div>
          </div>
        </div>
      </div>

      {/* Start / Stop / Pause Buttons */}
      <div className="timer-buttons">
        {!isRunning && hasStarted && (
          <Button onClick={startTimer} text="Start" variant="primary" />
        )}

        {isRunning && (
          <Button onClick={pauseTimer} text="Pause" variant="secondary" />
        )}

        {hasStarted && (
          <Button
            onClick={handleStopClick}
            disabled={!hasStarted}
            text="Stop"
            variant="primary"
          />
        )}

        {/* Mode buttons */}
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
              variant="primary"
            />
          </>
        )}

        {/* Start session / Return button */}
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
              onClick={resetModeSelect}
              disabled={selectedMode === null}
              text="Återgå"
              variant="primary"
            />
          </>
        )}

        <p>{selectedMode}</p>
      </div>
    </div>
  );
}
