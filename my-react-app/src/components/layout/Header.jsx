import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/">Dashboard</Link>
      <Link to="/dashboard">Dashboard</Link>
    </header>
  );
}