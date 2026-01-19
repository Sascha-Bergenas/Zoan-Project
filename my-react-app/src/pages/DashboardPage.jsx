import BaseCard from "../components/ui/Card";
import styles from "./Dashboard.module.css";

function Dashboard() {
  return (
    <>
      <div className={styles.container}>
        <BaseCard size="card-timer">
          <p>Testar</p>
          <p>Testar</p>
          <p>Testar</p>
          <p>Testar</p>
          <p>Testar</p>
          <p>Testar</p>
        </BaseCard>
        <BaseCard size="card-large">
          <p>Testar</p>
          <p>Testar</p>
          <p>Testar</p>
          <p>Testar</p>
          <p>Testar</p>
          <p>Testar</p>
        </BaseCard>

        <BaseCard size="card-small">
          <p>Testar</p>
          <p>Testar</p>
          <p>Testar</p>
          <p>Testar</p>
          <p>Testar</p>
          <p>Testar</p>
        </BaseCard>
        <BaseCard>
          <p>Testar</p>
          <p>Testar</p>
          <p>Testar</p>
          <p>Testar</p>
          <p>Testar</p>
          <p>Testar</p>
        </BaseCard>
      </div>
    </>
  );
}
export default Dashboard;
