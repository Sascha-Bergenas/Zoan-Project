import { useState, useEffect, useRef } from "react";
import styles from "./HistoryPage.module.css";
import List from "../../components/ui/lists/List";
import BaseCard from "../../components/ui/cards/Card"
import Button from "../../components/ui/button/Button";
import SessionModal from "../../Features/modals/sessionModal/sessionModal";
import { useAuth } from "../../contexts/useAuth";
import getSessions from "../../supabase/getSessions"; 


export default function History() {
  const { user, isAuthed } = useAuth();
  const [ sessions, setSessions ] = useState([])
  const [ refreshKey, setRefreshKey ] = useState(0)
  const dialogRef = useRef(null);

  const timerData = {
    startedAt: 0,
    endedAt: 0,
    activeTime: 0
  }
  
  const handleSessionSaved = () => setRefreshKey((k) => k +1)

  // Hämta data från Supabase

  useEffect(() => {
    let mounted = true
    const fetchSessions = async () => {
      if(!isAuthed) return

      try {
          const data = await getSessions()
          if(mounted) setSessions(data || [])
      } catch (err) {
        console.log(err)
      }
    }
    
    fetchSessions()
    return () => { mounted = false}

  }, [isAuthed, user?.id, refreshKey])

  const handleAddClick = () => dialogRef.current.showModal()

  return (
    <>
      <h2 className="text-lg">Statserinos</h2>

      <section className={styles.wrapper}>
        <div className={styles.container}>
          <h3>Loggade sessioner</h3>
          <SessionModal 
            dialogRef={dialogRef}
            stopTimeFormatted={"Ange sessionens längd"}
            timerData={timerData}
            handleCloseModal={() => dialogRef.current.close()}
            handleSessionSaved={handleSessionSaved}
          />
          {/* Knapp för manuell loggning */}
          <Button text={"Lägg till"} variant="secondary" onClick={handleAddClick}/>
          <BaseCard>
            <List sessions={sessions} />
          </BaseCard>
          {/* Put eventuellt knapp för manuell loggning here */}
        </div>
      </section>

      {/* Put en najsig graf here (OBS! INTE en Graaf) */}

    </>
  );
}
