import styles from "./Select.module.css";

function Select({ label, name, value, onChange, children, className }) {
  return (
    <div className={`${styles.select} ${className}`}>
      <label>
        <span>{label}</span>
        <select name={name} value={value} onChange={onChange}>
          {children}
        </select>
      </label>
    </div>
  );
}
export default Select;
