import "./Input.css";

const Input = ({ label, type = "text", placeholder, value, onChange }) => {
  const inputClass = "input";
  return (
    <label>
      {label}
      <input
        type={type}
        className={inputClass}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
};

export default Input;
