import BaseCard from "../../components/ui/cards/Card";
import styles from "./Dashboard.module.css";
import WorkSessionForm from "../../components/ui/form/WorkSessionForm";
import Timer from "../../components/Features/timer/Timer";
import Topbar from "../../components/layout/Topbar";

function Dashboard() {
  return (
    <>
      <div className={styles.container}>
        <BaseCard className={styles.timer} size="card-timer">
          <Timer />
        </BaseCard>
      <Topbar></Topbar>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <BaseCard className={styles.timer} size="card-timer">
            <p>CARD TIMER</p>
          </BaseCard>

          <BaseCard className={styles.card1} size="card-large">
            <h3>CARD 1 Status</h3>
          </BaseCard>

          <BaseCard className={styles.card2} size="card-medium">
            <h3>CARD 2 Smarta rekommendationer</h3>
          </BaseCard>

          <BaseCard className={styles.card3} size="card-small">
            <h3>CARD 3 Mood</h3>
          </BaseCard>

          <BaseCard className={styles.card4} size="card-small">
            <h3> Card 4 Logga Arbetspass</h3>
            <WorkSessionForm />
          </BaseCard>

          <BaseCard className={styles.card5} size="card-small">
            <h3> Card 5 Kalender</h3>
          </BaseCard>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
