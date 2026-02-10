import BaseCard from "../../components/ui/cards/Card";
import styles from "./Dashboard.module.css";
import Timer from "../../Features/timer/Timer";
import Topbar from "../../components/layout/Topbar";
import useTimerLogic from "../../Features/timer/timerLogic";
import CalendarCard from "../../Features/calendar/CalendarCard";
import Todo from "../../Features/todo/Todo";
import Profile from "../../components/ui/profile/Profile";
import RandomQuote from "../../Features/quotes/RandomQuote";

function Dashboard() {
  const timer = useTimerLogic();

  return (
    <>
      <Topbar timer={timer} />

      <div className={styles.wrapper}>
        <div className={styles.container}>
          <BaseCard className={styles.card1} size="card-large">
            <Profile />
            <RandomQuote />
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
