import { RefObject } from "react";
import useSessions from "../../../contexts/sessions/useSessions";
import EditWorkSessionForm from "../../sessions/EditWorkSessionForm"
import Modal from "../../../components/ui/modal/Modal";
import type { SessionFormData } from "../../../contexts/sessions/types";
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
      if (mode === "new") {
        await actions.save(payload);
      } else if (session) {
        await actions.update(toUpdatedSessionData(payload, session));
      }
  
      dialogRef.current?.close();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal dialogRef={dialogRef} onClose={handleClose}>
      {/* <Modal dialogRef={dialogRef} onClose={handleCloseModal}> */}
        {" "}
        <h3>Logga din session</h3>
        <EditWorkSessionForm
            initialData={session ? toSessionFormData(session) : undefined}
            handleSubmit={handleSubmit}
          />
      {/* </Modal>{" "} */}
    </Modal>
  );
}