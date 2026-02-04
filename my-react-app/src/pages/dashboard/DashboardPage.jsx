import BaseCard from "../../components/ui/cards/Card";
import styles from "./Dashboard.module.css";
import Timer from "../../components/Features/timer/Timer";
import Topbar from "../../components/layout/Topbar";
import useTimerLogic from "../../components/Features/timer/timerLogic";
import CalendarCard from "../../components/Features/calendar/CalendarCard";
import Todo from "../../components/Features/todo/Todo";

function Dashboard() {
  const timer = useTimerLogic();

  return (
    <>
      <Topbar timer={timer} />

      <div className={styles.wrapper}>
        <div className={styles.container}>
          <BaseCard className={styles.card1} size="card-large">
            <h3>CARD 1 Status</h3>
          </BaseCard>

          <BaseCard className={styles.card2} size="card-medium">
            <h3>CARD 2 Smarta rekommendationer</h3>
          </BaseCard>

          <BaseCard className={styles.timer} size="card-timer">
            <Timer timer={timer} />
          </BaseCard>

          <BaseCard className={styles.card5} size="card-small">
            <CalendarCard />
          </BaseCard>

          <BaseCard className={styles.card4} size="card-small">
            <h3>Todo</h3>
            <Todo />
          </BaseCard>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
