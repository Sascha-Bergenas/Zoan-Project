import "./Card.css";

export default function BaseCard({ children, className, size }) {
  return <div className={`card ${size} ${className}`}>{children}</div>;
}
