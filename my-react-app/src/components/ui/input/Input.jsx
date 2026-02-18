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
          {label}
        <input
          className={className ? `input ${className}` : "input"}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          min={type === "time" ? min : null}
          max={type === "time" ? max : null}
          step={type === "time" ? step : null}
        />
      </label>
    </div>
  );
};

export default Input;
