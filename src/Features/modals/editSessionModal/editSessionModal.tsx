import { ChangeEvent, useEffect, useRef, RefObject } from "react";
import { useAuth } from "../../../contexts/useAuth";
import type { SessionData } from "../../../contexts/sessions/types"; 
import useSessions from "../../../contexts/sessions/useSessions";
import { sessionStore } from "../../../storage/localStorage"
import EditWorkSessionForm from "../../sessions/EditWorkSessionForm"
import "../../../components/ui/modal/Modal.module.css";

// Modal-komponent för att manuellt logga en arbetsession eller redigera en redan loggad session.

type Props = {
  mode: "new" | "edit"
  session_id: string
  dialogRef: RefObject<HTMLDialogElement | null>
  // children?: React.ReactNode
  // onRequestClose?: () => void
}

export default function EditSessionModal({mode, session_id, dialogRef }: Props) {
  const { user, isAuthed } = useAuth();
  const {sessions, actions} = useSessions()

  const emptyTemplate: SessionData = {
        session_id: "",
        user_id: user,
        startedAt: new Date().toLocaleString(),
        endedAt: new Date().toLocaleString(),
        active_time_ms: 0, 
        title: "",
        category: "",
        comment: "",
        mood: null,
      }

  const session = mode === "edit" 
    ? sessions.find(s => s.session_id === session_id) ?? emptyTemplate
    : emptyTemplate


  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const handleCloseModal = () => {
    dialogRef.current?.close();
    // onRequestClose?.();
  };

  // Hanterar formulär - rensar formulär och state
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, formData: SessionData) => {
    e.preventDefault();

    try {
      if (isAuthed) {
        mode === "new" 
        ? await actions.save(formData)
        : await actions.update(formData)
        // handleSessionSaved?.()
        console.log("sparat till db");
      } else {
        sessionStore.add(formData)
        console.log("sparat till local");
      }

      dialogRef.current?.close()

      // Nollställer state
      // setWorkSession({ 
      //   endedAt: new Date(0).toLocaleString(), 
      //   startedAt: new Date(0).toLocaleString(), 
      //   activeTime: 0, 
      //   title: "", 
      //   category: "", 
      //   comment: "", 
      //   mood: 0 
      // });

      // Nollställer formulärets HTML-element
      // e.target.reset();

      // Stänger modalen efter inlämning
      // handleCloseModal();
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <dialog ref={dialogRef}>
      {/* <Modal dialogRef={dialogRef} onClose={handleCloseModal}> */}
        {" "}
        <h3>Logga din session</h3>
          <EditWorkSessionForm initialData={session} handleSubmit={handleSubmit}/>
      {/* </Modal>{" "} */}
    </dialog>
  );
}
