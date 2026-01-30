import "./Input.css";

const Input = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  className,
}) => {
  return (
    <div className="input-wrapper">
      <label>
        <span>{label}</span>
        <input
          className={className ? `input ${className}` : "input"}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
        />
      </label>
    </div>
  );
};

export default Input;
