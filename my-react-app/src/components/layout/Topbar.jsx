import TopBarCard from "./TopBarCard";
import styles from "./Topbar.module.css";
import { calcTime } from "../../utils/formatTime";
import { useTimer } from "../../contexts/TimerContext";


export default function Topbar() {
  const { getStartedTime, hasStarted, now } = useTimer();
  const startedAt = getStartedTime();

  const totalTimeMs =
    hasStarted && startedAt ? Math.max(0, now - startedAt) : 0;
  const { formattedHours, formattedMinutes } = calcTime(totalTimeMs);

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
        <p>Deep work</p>
      </TopBarCard>
    </aside>
  );
}
