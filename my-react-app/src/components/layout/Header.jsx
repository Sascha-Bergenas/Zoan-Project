import { Link } from "react-router-dom";
import LoginModal from "../../Features/modals/loginModal/loginModal";
import { useAuth } from "../../contexts/useAuth";
import Button from "../ui/button/Button";
import "./header.css";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function Header() {
  const { isAuthed, user, signOut } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);

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
          <li>
            {!isAuthed && <LoginModal />}

            {isAuthed && (
              <>
                <li>
                  <p className="text-sm">Inloggad som: {user.email}</p>
                </li>
                <li>
                  <Button text="Logga ut" type="button" onClick={signOut} />
                </li>
              </>
            )}
          </li>
          <li>
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === "dark" ? <Sun size={25} /> : <Moon size={25} />}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
