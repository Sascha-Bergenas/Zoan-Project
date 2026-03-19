import { useState, useEffect, useRef } from "react";
import { SessionsProvider } from "../../contexts/sessions/SessionsProvider";
import styles from "./HistoryPage.module.css";
import List from "../../components/ui/lists/List";
import BaseCard from "../../components/ui/cards/Card"
import Button from "../../components/ui/button/Button";
import EditSessionModal from "../../Features/modals/editSessionModal/editSessionModal";
import { useAuth } from "../../contexts/useAuth";
// import getSessions from "../../supabase/getSessions";
import Graph from "../../Features/graph/graph";
import EditWorkSessionForm from "../../Features/sessions/EditWorkSessionForm";
import { sessionStore } from "../../storage/localStorage";
import useSessions from "../../contexts/sessions/useSessions";

export default function History() {
  const { user, isAuthed } = useAuth();
  // const [ sessions, setSessions ] = useState([])
  const [ refreshKey, setRefreshKey ] = useState(0)
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const { sessions } = useSessions();
   
  
  // Tvinga listan att laddas om när en session har lagts till eller ändrats
  // const handleSessionSaved = () => setRefreshKey((k) => k +1)

  // Hämta data från Supabase
  // useEffect(() => {
  //   let mounted = true;
  //   const fetchSessions = async () => {
  //     if(!isAuthed) return

  //     try {
  //         const data = await getSessions(user.id)
  //         if(mounted) setSessions(data || [])
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
    
  //   fetchSessions()
  //   return () => { mounted = false}

  // }, [isAuthed, user?.id])

  const handleAddClick = () => { 
    console.log(sessions)
    dialogRef.current?.showModal()
  }

  return (
    <>
      <h2 className="text-lg">Statserinos</h2>

      <section className={styles.wrapper}>
        <div className={styles.container}>
          <h3>Loggade sessioner</h3>
        
            <EditSessionModal mode="new" dialogRef={dialogRef}/* onRequestClose={() => setIsModalOpen(false)}*/ />
      
          {/* Knapp för manuell loggning */}
          <Button text={"Lägg till"} variant="secondary" onClick={handleAddClick}/>
          <BaseCard className={""} size={""}>
            <List />
          </BaseCard>
          {/* Put eventuellt knapp för manuell loggning here */}
        </div>
      </section>

      <Graph sessions={sessions} />
      </>

  );
}