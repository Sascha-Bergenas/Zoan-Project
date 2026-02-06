import "./Card.css";

export default function BaseCard({ children, className, size }) {
  return <div className={`card ${size} ${className}`}>{children}</div>;
}
//La till className i dina props.
//Sorry, not sorry.
//Sascha.
