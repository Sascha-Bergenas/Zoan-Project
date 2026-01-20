import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav>
        <Link to="/">Dashboard</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/history">Historik</Link>
      </nav>
    </header>
  );
}
