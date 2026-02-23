import { useRef, useState } from "react";
import Button from "../../components/ui/button/Button";
import SessionModal from "../modals/sessionModal/sessionModal";
import "./Timer.css";
import { useTimer } from "../../contexts/TimerContext";

export default function Timer() {
  // const [selectedMode, setSelectedmode] = useState(null);

  const {
    time,
    state,
    actions,
    getStartedTime,
  } = useTimer();

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

  // function handleModeSelect(mode) {
  //   setSelectedmode(mode);
  // }

  // function resetModeSelect() {
  //   setSelectedmode(null);
  // }

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
    actions.stop();
    dialogRef.current.showModal();
  };

  const handleCloseModal = () => {
    dialogRef.current.close();
    // resetModeSelect();
    actions.clearMode();
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
      {/* Mode buttons */}
        {state.status === 'idle' && state.mode == null && (
          <>
            <p style={{ fontSize: "text-sm" }}>Välj Work mode</p>
            <Button
              onClick={() => actions.selectMode("deep")}
              text="Deep Work"
              variant="primary"
            />
            <Button
              onClick={() => actions.selectMode("meeting")}
              text="Möte"
              variant="secondary"
            />
            <Button
              onClick={() => actions.selectMode("chill")}
              text="Chill"
              variant="primary"
            />
          </>
        )}
                {/* Start session / Return button */}
        {state.status === 'idle' && state.mode != null && state.firstStartedAtMs == null && (
          <>
            <p>Starta en ny session och påbörja timern.</p>
            <Button
              onClick={actions.start}
              disabled={state.mode === null}
              text="Starta Session"
              variant="primary"
            />
            <Button
              onClick={actions.clearMode}
              disabled={state.mode === null}
              text="Återgå"
              variant="primary"
            />
          </>
        )}

        {state.status !== 'idle' && state.firstStartedAtMs != null && (
          <>
          {state.status === "running" ? (
            <Button onClick={actions.pause} text="Pause" variant="secondary" />
          ) : (
            <Button onClick={actions.start} text="Resume" variant="secondary" />
          )}
    
          <Button onClick={handleStopClick} text="Stop" variant="primary" />
        </>
      )}

        <p>{state.mode}</p>
      </div>
    </div>
  );
}
