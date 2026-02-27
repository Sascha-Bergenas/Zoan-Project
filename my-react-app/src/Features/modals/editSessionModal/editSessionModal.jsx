import { useEffect, useRef } from "react";
import EditWorkSessionForm from "../../sessions/EditWorkSessionForm"
import Modal from "../../../components/ui/modal/Modal";

// Modal-komponent för att manuellt logga en arbetsession eller redigera en redan loggad session.

export default function EditSessionModal({ handleSessionSaved, onRequestClose }) {
  const dialogRef = useRef(null);

  const sessionData = {
    startedAt: new Date().toLocaleString(),
    endedAt: new Date().toLocaleString(),
    activeTime: "00:00",
    title: "",
    category: "",
    comment: "",
    mood: 0,
  }
  
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
          handleCloseModal={handleCloseModal}
          handleSessionSaved={handleSessionSaved}
          sessionData={sessionData}
        />{" "}
      </Modal>{" "}
    </>
  );
}
