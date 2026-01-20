import "./Button.css";

export default function Button({
  text,
  type = "button",
  variant = "primary",
  disabled = false,
}) {
  return (
    <button type={type} disabled={disabled} className={`btn btn-${variant}`}>
      {text}
    </button>
  );
}
