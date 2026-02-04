import { Link } from "react-router-dom";
import LoginModal from "../Features/modals/loginModal/LoginModal";
import { useAuth } from "../../contexts/useAuth";
import Button from "../ui/Button";
import "./header.css";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function Header() {
  const { isAuthed, user, signOut } = useAuth();
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <header>
      <nav>
        <h1 className="text-lg">Zoan</h1>
        <ul className="text-md">
          <li>
            <button onClick={toggleTheme}>Dark Mode</button>
          </li>
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
        </ul>
      </nav>
    </header>
  );
}
