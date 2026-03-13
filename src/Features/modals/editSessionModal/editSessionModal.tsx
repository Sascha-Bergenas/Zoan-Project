import { useEffect, useRef, RefObject } from "react";
import { useAuth } from "../../../contexts/useAuth";
import type { SessionData } from "../../../contexts/sessions/types"; 
import useSessions from "../../../contexts/sessions/useSessions";
import { sessionStore } from "../../../storage/localStorage"
import EditWorkSessionForm from "../../sessions/EditWorkSessionForm"
// import Modal from "../../../components/ui/modal/Modal";

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


    useEffect(() => {
      dialogRef.current?.showModal();
    }, [dialogRef]);


  // const handleCloseModal = () => {
  //   dialogRef.current?.close();
  //   onRequestClose?.();
  // };

  // Hanterar formulär - rensar formulär och state
  const handleSubmit = async (payload: SessionData) => {
    // e.preventDefault();

    // const sessionToSave = {
    //   ...session,
    // };
    
    // const activeMinutes = toMinutes(sessionToSave.activeTime);
    // if (activeMinutes > maxActiveMinutes) {
    //   alert(`Aktiv tid får vara max ${maxActiveHHMM}`);
    //   return;
    // }
    
    // // Ett nödvändigt ont för att konvertera "HH:MM" till ms för att matcha fältet i databasen:
    // sessionToSave.activeTime = 
    //   Number(sessionToSave.activeTime.slice(0, 2)) * 3600000 + 
    //   Number(sessionToSave.activeTime.slice(3, 5)) * 60000

    try {
      if (isAuthed) {
        mode === "new" 
        ? await actions.save(payload)
        : await actions.update(payload)

        // handleSessionSaved?.()
        console.log("sparat till db");
      } else {
        sessionStore.add(payload)
        console.log("sparat till local");
      }

      dialogRef.current?.close();

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
