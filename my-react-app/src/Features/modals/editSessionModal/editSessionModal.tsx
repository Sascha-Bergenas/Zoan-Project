import { Children, useEffect, useRef } from "react";
import useSessions from "../../../contexts/sessions/useSessions";
import type { SessionData } from "../../../types/sessions";
import EditWorkSessionForm from "../../sessions/EditWorkSessionForm"
import Modal from "../../../components/ui/modal/Modal";

// Modal-komponent för att manuellt logga en arbetsession eller redigera en redan loggad session.

type Props = {
  children?: React.ReactNode
  onRequestClose?: () => void
}

export default function EditSessionModal({children, onRequestClose }: Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const {sessions} = useSessions()

  const sessionData: SessionData = {
    user_id: "",
    session_id: "",
    started_at: new Date().toLocaleString(),
    ended_at: new Date().toLocaleString(),
    active_time_ms: 0, 
    title: "",
    category: "",
    comment: "",
    mood: null,
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
      <Modal dialogRef={dialogRef} onClose={handleCloseModal}>
        {" "}
        <h3>Logga din session</h3>
        {children}
      </Modal>{" "}
    </>
  );
}
