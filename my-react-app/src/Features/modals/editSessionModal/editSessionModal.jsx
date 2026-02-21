import { useEffect, useRef } from "react";
// import type {ReactNode, RefObject} from "react"
import EditWorkSessionForm from "../../sessions/EditWorkSessionForm"
import Modal from "../../../components/ui/modal/Modal";

// Modal-komponent för att manuellt logga en arbetsession eller redigera en redan loggad session.

export default function EditSessionModal({ record = null, handleSessionSaved, onRequestClose }) {
  const dialogRef = useRef(null);
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
    .toLocaleString()
    .slice(11, 16)
  const sessionData = newSession

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const handleCloseModal = () => {
    dialogRef.current?.close();
    onRequestClose?.();
  };

  return (
    <>
      {" "}
      <Modal dialogRef={dialogRef} onClose={onRequestClose}>
        {" "}
        <h3>Logga din session</h3>
        <EditWorkSessionForm
          key={record?.id ?? "new"}
          handleCloseModal={handleCloseModal}
          handleSessionSaved={handleSessionSaved}
          sessionData={sessionData}
        />{" "}
      </Modal>{" "}
    </>
  );
}
