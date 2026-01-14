import "./InfoCard.css";

export default function InfoCard({ items, title }) {
  return (
    <div className="info-card">
      <h3 className="info-card-title">{title}</h3>
      <ul className="info-card-list">
        {items.map((item, i) => (
          <li key={i} className="info-card-item">
            <span className="info-card-icon">{item.icon}</span>
            <span className="info-card-text">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
