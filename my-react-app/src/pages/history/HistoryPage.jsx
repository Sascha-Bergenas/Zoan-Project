import { useState, useEffect } from "react";
import styles from "./HistoryPage.module.css";
import List from "../../components/ui/lists/List";
import BaseCard from "../../components/ui/cards/Card"
import { useAuth } from "../../contexts/useAuth";
import getSessions from "../../supabase/getSessions"; 


export default function History() {
  // const mockData = [{
  //   date: "2026-02-03",
  //   header: "Jobbat med attityden",
  //   category: "Möte", 
  //   startTime: "12.00", 
  //   stopTime: "16.00", 
  //   zoanTime: "04.00", 
  //   pauseTime: "00.00", 
  //   comment: "Folks problem! Det är väl inget fel på min attityd! Det är ju andra som är dumma i huvet!", 
  //   mood: "Bitter"
  // },
  // {
  //   date: "2026-02-03",
  //   header: "Jobbat med branchen",
  //   category: "Jobb", 
  //   startTime: "08.00", 
  //   stopTime: "11.30", 
  //   zoanTime: "03.00", 
  //   pauseTime: "00.30", 
  //   comment: "Svårt, med det gick framåt", 
  //   mood: "Great"
  // },
  // {
  //   date: "2026-02-06",
  //   header: "Tvingat AI:n i VS C till slavgöra",
  //   category: "Jobb", 
  //   startTime: "09.30", 
  //   stopTime: "11.30", 
  //   zoanTime: "02.00", 
  //   pauseTime: "00.00", 
  //   comment: "Piskar man bara tillräckligt hårt och tillräckligt ofta så kan den ju vara riktigt duglig ibland.", 
  //   mood: "Maniac"
  // }]

  const { user, isAuthed } = useAuth();
  const [ sessions, setSessions ] = useState([])
  
  // Hämta data från Supabase/localStorage

  useEffect(() => {
    let mounted = true
    const fetchSessions = async () => {
      if(!isAuthed) return

      try {
          const data = await getSessions(user.id)
          if(mounted) setSessions(data || [])
      } catch (err) {
        console.log(err)
      }
    }
    fetchSessions()
    return () => { mounted = false}

  }, [isAuthed, user?.id])


  return (
    <>
      <h2 className="text-lg">Statserinos</h2>

      <section className={styles.wrapper}>
        <div className={styles.container}>
          <h2>Loggade sessioner</h2>
            <BaseCard>
              <List sessions={sessions} />
            </BaseCard>
        </div>
      </section>


      {/* Placeholder för graf */}

      {/*  Placeholder för manuell loggning */}
    </>
  );
}
