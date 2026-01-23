import { Link } from "react-router-dom";
import "./header.css";

export default function Header() {
  return (
    <header>
      <nav>
        <h1 className="text-lg">Zoan</h1>
        <ul className="text-md">
          <li>
            <Link to="/">Dashboard</Link>
          </li>

          <li>
            <Link to="/history">Historik</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
