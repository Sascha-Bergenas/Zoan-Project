import styles from "./HistoryPage.module.css";
import List from "../../components/ui/lists/List";

export default function History() {
  // Hämta data från Supabase/localStorage
  const mockData = [{
    date: "2026-02-03",
    header: "Jobbat med attityden",
    category: "Möte", 
    startTime: "12.00", 
    stopTime: "16.00", 
    zoanTime: "04.00", 
    pauseTime: "00.00", 
    comment: "Förstår inte vad folks problem är! Det är väl inget fel på min attityd! Det är ju andra som är dumma i huvet!", 
    mood: "Bad"
  },
  {
    date: "2026-02-03",
    header: "Jobbat med branchen",
    category: "Jobb", 
    startTime: "08.00", 
    stopTime: "11.30", 
    zoanTime: "03.00", 
    pauseTime: "00.30", 
    comment: "Svårt, med det gick framåt", 
    mood: "Great"
  }
  ]
  return (
    <>
      <h1>Statserinos</h1>

      <section className={styles.wrapper}>
        <div className={styles.container}>
          <h2>Loggade sessioner</h2>
            <List sessions={mockData} />
        </div>
      </section>


      {/* Placeholder för graf */}

      {/*  Placeholder för manuell loggning */}
    </>
  );
}
