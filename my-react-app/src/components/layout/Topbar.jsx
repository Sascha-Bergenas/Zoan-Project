import TopBarCard from "./TopBarCard";
import styles from "./Topbar.module.css";
import { calcTime } from "../../utils/formatTime";

export default function Topbar({ timer }) {
  const { getStartedTime, hasStarted, now } = timer;
  const startedAt = getStartedTime();

  const totalTimeMs =
    hasStarted && startedAt ? Math.max(0, now - startedAt) : 0;
  const { formattedHours, formattedMinutes } = calcTime(totalTimeMs);

  return (
    <aside className={styles.container}>
      <TopBarCard title="Total tid" color="green">
        <p>
          {formattedHours}h {formattedMinutes}min
        </p>
      </TopBarCard>
      <TopBarCard title="Energiprognos" color="yellow">
        <p>Gla som sjutton</p>
      </TopBarCard>
      <TopBarCard title="Nästa rast" color="red">
        <p>om 45min</p>
      </TopBarCard>
      <TopBarCard title="Nuvarande mode" color="green">
        <p>Deep work</p>
      </TopBarCard>
    </aside>
  );
}
