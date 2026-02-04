import { Link } from "react-router-dom";
import LoginModal from "../../Features/modals/loginModal/loginModal";
import { useAuth } from "../../contexts/useAuth";
import Button from "../ui/Button";
import "./header.css";

export default function Header() {
  const { isAuthed, user, signOut } = useAuth();

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
        </ul>
      </nav>
    </header>
  );
}
