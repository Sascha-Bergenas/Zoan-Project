import { Children, useEffect, useRef } from "react";
import useSessions from "../../../contexts/sessions/useSessions";
import EditWorkSessionForm from "../../sessions/EditWorkSessionForm"
import Modal from "../../../components/ui/modal/Modal";

// Modal-komponent för att manuellt logga en arbetsession eller redigera en redan loggad session.

type Props = {
  mode: "new" | "edit"
  sessionId?: string
  // children?: React.ReactNode
  // onRequestClose?: () => void
}

export default function EditSessionModal({mode, sessionId }: Props) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const {sessions} = useSessions()

  const session = 
    mode === "edit" 
    ? sessions.find(s => s.session_id === sessionId)
    : undefined

  // const  = {

  // }
  
  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  // const handleCloseModal = () => {
  //   dialogRef.current?.close();
  //   onRequestClose?.();
  // };

  // Hanterar formulär - rensar formulär och state
  const handleSubmit = async (e) => {
    e.preventDefault();

    const sessionToSave = {
      ...workSession,
    };
    
    const activeMinutes = toMinutes(sessionToSave.activeTime);
    if (activeMinutes > maxActiveMinutes) {
      alert(`Aktiv tid får vara max ${maxActiveHHMM}`);
      return;
    }
    
    // Ett nödvändigt ont för att konvertera "HH:MM" till ms för att matcha fältet i databasen:
    sessionToSave.activeTime = 
      Number(sessionToSave.activeTime.slice(0, 2)) * 3600000 + 
      Number(sessionToSave.activeTime.slice(3, 5)) * 60000

    try {
      if (isAuthed) {
        await saveSession(user.id, sessionToSave);
        handleSessionSaved?.()
        console.log("sparat till db");
      } else {
        sessionStore.add(sessionToSave);
        console.log("sparat till local");
      }

      // Nollställer state
      setWorkSession({ 
        endedAt: new Date(0).toLocaleString(), 
        startedAt: new Date(0).toLocaleString(), 
        activeTime: "00:00", 
        title: "", 
        category: "", 
        comment: "", 
        mood: 0 
      });

      // Nollställer formulärets HTML-element
      e.target.reset();

      // Stänger modalen efter inlämning
      // handleCloseModal();
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <>
      {/* <Modal dialogRef={dialogRef} onClose={handleCloseModal}> */}
        {" "}
        <h3>Logga din session</h3>
          <EditWorkSessionForm initialData={session} handleSubmit={handleSubmit}/>
      {/* </Modal>{" "} */}
    </>
  );
}
