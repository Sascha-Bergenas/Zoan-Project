import { useMemo, useState } from "react";
// import type {ReactNode, RefObject} from "react"
import EditForm from "../../../components/ui/form/editForm"
import Modal from "../../../components/ui/modal/Modal";

// type CreateSessionModalProps = {
//   children: ReactNode
//   dialogRef: RefObject<HTMLDialogElement | null>
// }

// Session modal komponent för att manuellt logga en arbetsession i efterhand
function CreateSessionModal({ dialogRef } /*: CreateSessionModalProps */) {
  const formatForDateTimeLocal = (date) => {
    const pad = (value) => String(value).padStart(2, "0");
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const initialNow = useMemo(() => formatForDateTimeLocal(new Date()), []);
  const [startValue, setStartValue] = useState(initialNow);
  const [stopValue, setStopValue] = useState(initialNow);
  const [durationHours, setDurationHours] = useState(0);
  const [durationMinutes, setDurationMinutes] = useState(0);

  const updateDurationFromDates = (nextStart, nextStop) => {
    if (!nextStart || !nextStop) return;
    const startMs = new Date(nextStart).getTime();
    const stopMs = new Date(nextStop).getTime();
    const diffMs = Math.max(0, stopMs - startMs);
    const totalMinutes = Math.floor(diffMs / 60000);
    setDurationHours(Math.floor(totalMinutes / 60));
    setDurationMinutes(totalMinutes % 60);
  };

  const totalDurationMinutes =
    Math.max(0, Number(durationHours) || 0) * 60 +
    Math.max(0, Number(durationMinutes) || 0);

  const timerData = {
    activeTime: totalDurationMinutes * 60000,
    startedAt: new Date(startValue),
    endedAt: new Date(stopValue),
  };

  return (
    <>
      {" "}
      <Modal dialogRef={dialogRef}>
        {" "}
        <h3>Logga din session</h3>
        <label>
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
        {/*  Objektet som ska skickas in som timerData in i WorkSessionForm
            const timerData = {
              activeTime: Number, ms
              startedAt, Date-objekt
              endedAt: Date-objekt,
            }; 
          */}
        <WorkSessionForm
          handleCloseModal={() => dialogRef.current.close()}
          timerData={timerData}
        />{" "}
      </Modal>{" "}
    </>
  );
}
export default CreateSessionModal;
