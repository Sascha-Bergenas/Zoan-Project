import styles from "./TextArea.module.css";

function TextArea({ label, name, value, onChange, placeholder, className }) {
  return (
    <div className={`${styles.textarea} ${className}`}>
      <label>
        <span>{label}</span>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </label>
    </div>
  );
}
export default TextArea;
