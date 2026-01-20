import styles from "./Select.module.css";

function Select({ label, name, children }) {
  return (
    <div className={styles.select}>
      <label>
        <span>{label}</span>
        <select name={name}>{children}</select>
      </label>
    </div>
  );
}
export default Select;
