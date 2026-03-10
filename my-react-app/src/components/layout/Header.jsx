import { NavLink } from "react-router-dom";
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
      <nav className="flex">
        <NavLink
            to="/"
            end>
          <img src="src/img/zoan-logo.png" alt="Logo" />
        </NavLink>
        <ul className="text-md flex">
          <li>
            <NavLink to="/" end className={ ({ isActive }) => 
              isActive ? 'link-active' : ''
            }>Dashboard</NavLink>
          </li>

          <li>
            <NavLink to="/history" className={({ isActive }) => 
            isActive ? 'link-active' : ''
            }>Historik</NavLink>
          </li>
          <li>
            <NavLink to="/settings" className={({ isActive }) => 
            isActive ? 'link-active' : ''
            }>Settings</NavLink>
          </li>

          {!isAuthed && <LoginModal />}

          {isAuthed && (
            <>
              <li className="logged-in flex">
                <p className="text-sm">
                  Hej <span className="text-bold">{user.email}!</span>
                </p>
                <Button
                  text="Logga ut"
                  type="login"
                  onClick={signOut}
                  variant="login"
                />
              </li>
            </>
          )}

          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "dark" ? <Sun size={25} /> : <Moon size={25} />}
          </button>
        </ul>
      </nav>
    </header>
  );
}
