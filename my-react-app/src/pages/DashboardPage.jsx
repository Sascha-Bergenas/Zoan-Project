import BaseCard from "../components/ui/Card";
import styles from "./Dashboard.module.css";
import WorkSessionForm from "../components/ui/form/WorkSessionForm";
import Header from "../components/layout/Header";

function Dashboard() {
  return (
    <>
      <Header></Header>
      <div className={styles.container}>
        <BaseCard className={styles.timer} size="card-timer">
          <p>TIMER</p>
          <p>TIMER</p>
          <p>TIMER</p>
          <p>TIMER</p>
          <p>TIMER</p>
          <p>TIMER</p>
          <p>TIMER</p>
        </BaseCard>
        <BaseCard className={styles.card1} size="card-large">
          <p>STATUS</p>
          <p>STATUS</p>
          <p>STATUS</p>
          <p>STATUS</p>
        </BaseCard>

        <BaseCard className={styles.card2} size="card-medium">
          <p>SMARTA REKOMMENDATIONER</p>
          <p>SMARTA REKOMMENDATIONER</p>
          <p>SMARTA REKOMMENDATIONER</p>
        </BaseCard>
        <BaseCard className={styles.card3} size="card-small">
          <p>MOOD</p>
          <p>MOOD</p>
          <p>MOOD</p>
          <p>MOOD</p>
        </BaseCard>
        <BaseCard>
          <h3>Logga Arbetspass</h3>
          <WorkSessionForm />
        </BaseCard>
      </div>
    </>
  );
}
export default Dashboard;
