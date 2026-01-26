import styles from "./StatusPanel.module.css";
import Button from "../../ui/Button";

function StatusPanel() {
  return (
    <>
      <div className={styles.panel}>
        <Button text="Deep Work" variant="primary" />
        <Button text="Möte" variant="secondary" />
        <Button text="Paus" variant="primary" />
        <Button text="Chill" variant="secondary" />
      </div>
    </>
  );
}
export default StatusPanel;
