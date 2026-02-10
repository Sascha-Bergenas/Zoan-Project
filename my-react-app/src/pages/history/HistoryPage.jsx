import { useState, useEffect } from "react";
import styles from "./HistoryPage.module.css";
import List from "../../components/ui/lists/List";
import BaseCard from "../../components/ui/cards/Card";
import { useAuth } from "../../contexts/useAuth";
import getSessions from "../../supabase/getSessions";
import Graph from "../../Features/graph/graph";

export default function History() {
  const { user, isAuthed } = useAuth();
  const [sessions, setSessions] = useState([]);

  // Hämta data från Supabase/localStorage

  useEffect(() => {
    let mounted = true;
    const fetchSessions = async () => {
      if (!isAuthed) return;

      try {
        const data = await getSessions(user.id);
        if (mounted) setSessions(data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSessions();
    return () => {
      mounted = false;
    };
  }, [isAuthed, user?.id]);

  return (
    <>
      <h2 className="text-lg">Statserinos</h2>

      <section className={styles.wrapper}>
        <div className={styles.container}>
          <h2>Loggade sessioner</h2>
          {/* Put antingen... 
              -knapp för manuell loggning eller
              -knappar för sortering och filter 
            ...here, inline med h2 eller på ny rad */}
          <BaseCard>
            <List sessions={sessions} />
          </BaseCard>
          {/* Put eventuellt knapp för manuell loggning here */}
        </div>
      </section>

      {/* Put en najsig graf here (OBS! INTE en Graaf) */}
      <Graph />
    </>
  );
}
