import { useEffect, useRef, RefObject } from "react";
import { useAuth } from "../../../contexts/useAuth";
import type { SessionFormData } from "../../../contexts/sessions/types"; 
import useSessions from "../../../contexts/sessions/useSessions";
import { sessionStore } from "../../../storage/localStorage"
import EditWorkSessionForm from "../../sessions/EditWorkSessionForm"
import Modal from "../../../components/ui/modal/Modal";
import { toSessionFormData, toUpdatedSessionData } from "../../../contexts/sessions/types";

// Modal-komponent för att manuellt logga en arbetsession eller redigera en redan loggad session.

type Props = {
  mode: "new" | "edit"
  sessionId?: string
  dialogRef: RefObject<HTMLDialogElement | null>;
    // children?: React.ReactNode
  // onRequestClose?: () => void
}

export default function EditSessionModal({mode, sessionId, dialogRef }: Props) {
  const { user, isAuthed } = useAuth();
  const {sessions, actions} = useSessions()

  const session = mode === "edit" 
    ? sessions.find(s => s.session_id === sessionId)
    : undefined

  // const handleCloseModal = () => {
  //   dialogRef.current?.close();
  //   onRequestClose?.();
  // };

  function handleClose(){
    dialogRef.current?.close();
  }

  // Hanterar formulär - rensar formulär och state
  const handleSubmit = async (payload: SessionFormData) => {
    try {
      if (isAuthed) {
        if (mode === "new") {
          await actions.save(payload);
        } else if (session) {
          const updatedSession = toUpdatedSessionData(payload, session);
          await actions.update(updatedSession);
        }
  
        console.log("sparat till db");
      } else {
        sessionStore.add(payload);
        console.log("sparat till local");
      }
  
      dialogRef.current?.close();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal dialogRef={dialogRef} onClose={handleClose}>
      {/* <Modal dialogRef={dialogRef} onClose={handleCloseModal}> */}
        {" "}
        <h3>Logga din session</h3>
    <EditWorkSessionForm
      {...(session ? { initialData: toSessionFormData(session) } : {})}
      handleSubmit={handleSubmit}
      />
      {/* </Modal>{" "} */}
    </Modal>
  );
}
