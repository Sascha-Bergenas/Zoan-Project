import BaseCard from "../../components/ui/Card";
import styles from "./Dashboard.module.css";
import WorkSessionForm from "../../components/ui/form/WorkSessionForm";

function Dashboard() {
  return (
    <>
      <div className={styles.container}>
        <BaseCard className={styles.timer} size="card-timer">
          <p>CARD TIMER</p>
        </BaseCard>

        <BaseCard className={styles.card1} size="card-large">
          <p>CARD 1</p>
        </BaseCard>

        <BaseCard className={styles.card2} size="card-medium">
          <p>CARD 2</p>
        </BaseCard>

        <BaseCard className={styles.card3} size="card-small">
          <p>CARD 3</p>
        </BaseCard>

        <BaseCard className={styles.card4} size="card-small">
          <h3>Logga Arbetspass</h3>
          <WorkSessionForm />
        </BaseCard>

        <BaseCard className={styles.card5} size="card-small">
          <h3>Kalender</h3>
        </BaseCard>
      </div>
    </>
  );
}
export default Dashboard;
