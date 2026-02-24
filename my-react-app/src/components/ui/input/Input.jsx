import "./Input.css";

const Input = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  className,
  min,
  max,
  step
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
          min={min}
          max={max}
          step={step}
        />
      </label>
    </div>
  );
};

export default Input;
