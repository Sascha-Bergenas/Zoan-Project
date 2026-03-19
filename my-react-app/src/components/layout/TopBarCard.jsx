import styles from "./TopBarCard.module.css";

export default function TopBarCard({ title, children, className = "" }) {
  return (
    <div className={`${styles.card} ${className}`}>
      <h3 className={styles.title}>{title}</h3>
      {children}
    </div>
  );
}
