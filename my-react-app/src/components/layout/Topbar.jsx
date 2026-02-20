import TopBarCard from "./TopBarCard";
import styles from "./Topbar.module.css";
import { calcTime } from "../../utils/formatTime";
import { useTimer } from "../../contexts/TimerContext";
import { useState, useEffect } from "react";


export default function Topbar() {
  const { state } = useTimer();
  const startedAt = state.firstStartedAtMs;
  const [now, setNow] = useState(() => Date.now());

  // Calculate and display total time
  useEffect(() => {
    if (state.firstStartedAtMs == null) return;
  
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [state.firstStartedAtMs]);

  const totalTimeMs =
    startedAt != null ? Math.max(0, now - startedAt) : 0;
  const { formattedHours, formattedMinutes } = calcTime(totalTimeMs);

  // Display mode
  function formatMode(mode) {
    if (!mode) return "-";
  
    switch (mode) {
      case "deep":
        return "Deep Work";
      case "meeting":
        return "Meeting";
      case "chill":
        return "Chill";
    }
  }

  return (
    <aside className={styles.container}>
      <TopBarCard title="Total tid" className={styles.card1}>
        <p>
          {formattedHours}h {formattedMinutes}min
        </p>
      </TopBarCard>
      <TopBarCard title="Energiprognos" className={styles.card2}>
        <p>Gla som sjutton</p>
      </TopBarCard>
      <TopBarCard title="Nästa rast" className={styles.card3}>
        <p>om 45min</p>
      </TopBarCard>
      <TopBarCard title="Nuvarande mode" className={styles.card4}>
        <p>{formatMode(state.mode)}</p>
      </TopBarCard>
    </aside>
  );
}
