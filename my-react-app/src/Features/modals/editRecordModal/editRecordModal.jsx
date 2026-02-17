// import { useMemo, useState } from "react";
// import type {ReactNode, RefObject} from "react"
import EditRecordForm from "../../../components/ui/form/editRecordForm"
import Modal from "../../../components/ui/modal/Modal";

// Modal-komponent för att manuellt logga en arbetsession eller redigera en redan loggad session.

export default function EditRecordModal({ dialogRef, record = null }) {
  let newSession = {}

  if(record) {newSession = {...record}} 
  else {newSession = {
    startedAt: new Date(),
  }}
  
  const sessionData = newSession
  if(!sessionData.startedAt) console.log("sessionData is empty");
  else console.log(sessionData);

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
        {/*  Objektet som ska skickas in som timerData in i WorkSessionForm
            const timerData = {
              activeTime: Number, ms
              startedAt, Date-objekt
              endedAt: Date-objekt,
            }; 
          */}
        <EditRecordForm
          handleCloseModal={() => dialogRef.current.close()}
          sessionData={sessionData}
        />{" "}
      </Modal>{" "}
    </>
  );
}
