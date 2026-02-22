import TopBarCard from "./TopBarCard";
import styles from "./Topbar.module.css";
import { calcTime } from "../../utils/formatTime";
import { useTimer } from "../../contexts/TimerContext";
import { useState, useEffect } from "react";


export default function Topbar() {
  const {
    state,
    isBreakTime,
    acknowledgeBreak,
  } = useTimer();
  const startedAt = state.firstStartedAtMs;
  const [now, setNow] = useState(() => Date.now());

  // Calculate and display total time
  useEffect(() => {
    if (state.firstStartedAtMs == null) return;
  
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [state.firstStartedAtMs]);
  
  let timeLabel = "-";

  if (state.nextBreakAtMs != null) {
    const msLeft = Math.max(0, state.nextBreakAtMs - now);
  
    if (msLeft >= 60000) {
      timeLabel = `om ${Math.floor(msLeft / 60000)} min`;
    } else {
      timeLabel = `om ${Math.floor(msLeft / 1000)} sek`;
    }
  }
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
      {isBreakTime ? (
        <div className="break-banner">
          <p>Time for a break!</p>
          <button onClick={acknowledgeBreak}>OK</button>
        </div>
      ) : (
        <p>{timeLabel}</p>
      )}
      </TopBarCard>
      <TopBarCard title="Nuvarande mode" className={styles.card4}>
        <p>{formatMode(state.mode)}</p>
      </TopBarCard>
    </aside>
  );
}
