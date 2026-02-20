// import { useMemo, useState } from "react";
// import type {ReactNode, RefObject} from "react"
import EditWorkSessionForm from "../../sessions/EditWorkSessionForm"
import Modal from "../../../components/ui/modal/Modal";

// Modal-komponent för att manuellt logga en arbetsession eller redigera en redan loggad session.

export default function EditSessionModal({ dialogRef, record = null, handleSessionSaved }) {
  let newSession = {}

  if(record) {newSession = {...record}} 
  else {newSession = {
    startedAt: new Date().toLocaleString(),
    endedAt: new Date().toLocaleString(),
    activeTime: 0,
    title: "",
    category: "",
    comment: "",
    mood: 0,
  }}
  
  // newSession.activeTime = new Date(newSession.activeTime)
  newSession.activeTime = new Date(newSession.activeTime)
    .toISOString()
    .slice(11, 16)
  const sessionData = newSession

  return (
    <>
      {" "}
      <Modal dialogRef={dialogRef}>
        {" "}
        <h3>Logga din session</h3>
        <>
          {/* <label>
          Start:
          <input
          type="datetime-local"
          name="start"
          value={startValue}
          onChange={(e) => {
              const nextStart = e.target.value;
              setStartValue(nextStart);
              updateDurationFromDates(nextStart, stopValue);
            }}
          />
          </label>

          <label>
          Slut:
          <input
          type="datetime-local"
          name="stop"
          value={stopValue}
          onChange={(e) => {
            const nextStop = e.target.value;
            setStopValue(nextStop);
            updateDurationFromDates(startValue, nextStop);
            }}
            />
            </label>

            <label>
            Varaktighet:
            <div>
            <input
            type="number"
              name="durationHours"
              min="0"
              value={durationHours}
              onChange={(e) => setDurationHours(e.target.value)}
              />
              <span>timmar</span>
              <input
              type="number"
              name="durationMinutes"
              min="0"
              max="59"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(e.target.value)}
              />
              <span>minuter</span>
              </div>
              </label> 
              */}
        </>
        <EditWorkSessionForm
          key={record?.id ?? "new"}
          handleCloseModal={() => dialogRef.current.close()}
          handleSessionSaved={handleSessionSaved}
          sessionData={sessionData}
        />{" "}
      </Modal>{" "}
    </>
  );
}