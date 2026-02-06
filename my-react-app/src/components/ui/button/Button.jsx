import "./Button.css";

export default function Button({
  text,
  type = "button",
  variant = "primary",
  disabled = false,
  onClick,
  className = "",
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
