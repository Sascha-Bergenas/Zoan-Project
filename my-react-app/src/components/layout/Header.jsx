import { Link } from "react-router-dom";
import LoginModal from "../../Features/modals/loginModal/loginModal";
import { useAuth } from "../../contexts/useAuth";
import Button from "../ui/button/Button";
import "./header.css";

export default function Header() {
  const { isAuthed, user, signOut } = useAuth();

  return (
    <header>
      <nav className="flex">
        <h1 className="text-md">Zoan</h1>
        <ul className="text-md flex">
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
                <li className="logged-in flex">
                  <p className="text-sm">
                    Hej <span className="text-bold">{user.email}!</span>
                  </p>
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
