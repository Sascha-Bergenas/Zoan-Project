import "./Card.css";

export default function Card({ title, img, description, children }) {
  return (
    <div className="card">
      <h3 className="card-title">{title}</h3>
      <img className="card-img" src={img} alt={title} />
      <p className="card-description">{description}</p>
      {children}
    </div>
  );
}
