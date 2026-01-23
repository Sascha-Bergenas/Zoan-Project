import BaseCard from "../../components/ui/Card";
import styles from "./Dashboard.module.css";
import WorkSessionForm from "../../components/ui/form/WorkSessionForm";

function Dashboard() {
  return (
    <>
      {" "}
      <main className={styles.main}>
        <div className={styles.container}>
          <BaseCard className={styles.timer} size="card-timer">
            <h3>CARD TIMER</h3>
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
            <h3>Logga Arbetspass</h3>
            <WorkSessionForm />
          </BaseCard>

          <BaseCard className={styles.card5} size="card-small">
            <h3>Kalender</h3>
          </BaseCard>
        </div>
      </main>
    </>
  );
}
export default Dashboard;
