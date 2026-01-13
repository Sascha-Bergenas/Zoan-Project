import "./Card.css";

export default function Card({ title, description, children }) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      {children}
    </div>
  );
}
