import { useState } from "react";
import Button from "../../components/ui/Button";
import { useAuth } from "../../contexts/useAuth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPassWordError] = useState("");

  const { signIn, signUp, user, isAuthed, signOut } = useAuth();

  //Switch between loginmode and signup mode
  function loginSignupToggle() {
    setIsSignedUp((prev) => !prev);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    }

    if (name === "password") {
      setPassword(value);
    }
  }

  //default form behaviour
  async function handleSubmit(e, action) {
    e.preventDefault();

    const trimmedEmail = email.trim();
    if (!validateForm(trimmedEmail)) return;

    if (action === "login") {
      const { error } = await signIn(trimmedEmail, password);
      if (error) return alert(error.message);
    }

    if (action === "signup") {
      const { error } = await signUp(trimmedEmail, password);
      if (error) return alert(error.message);
    }

    setEmail("");
    setPassword("");
  }

  function validateForm(trimmedEmail) {
    if (trimmedEmail === "") {
      setEmailError("Skriv in en e-postadress");
      return false;
    }

    if (!trimmedEmail.includes("@")) {
      setEmailError("Ogiltig e-postadress");
      return false;
    }

    if (password === "") {
      setPassWordError("Skriv in ditt lösenord.");
      return false;
    }

    if (password.length < 6) {
      setPassWordError("Ditt lösenord måste vara minst 6 tecken.");
      return false;
    }

    return true;
  }

  return (
    <form>
      {isSignedUp ? (
        <>
          <div>
            <input
              name="email"
              placeholder="E-post"
              type="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              name="password"
              placeholder="Lösenord"
              type="password"
              value={password}
              onChange={handleChange}
            />
          </div>
          {emailError && <p>{emailError}</p>}
          {passwordError && <p>{passwordError}</p>}

          {/* Log in button */}
          {!isAuthed && (
            <Button
              text="Logga in"
              type="button"
              onClick={(e) => handleSubmit(e, "login")}
            />
          )}

          <Button
            text="Bli medlem"
            type="button"
            variant="secondary"
            onClick={loginSignupToggle}
          />
        </>
      ) : (
        <>
          <input
            name="email"
            placeholder="E-post"
            type="email"
            value={email}
            onChange={handleChange}
          />
          <input
            name="password"
            placeholder="Lösenord"
            type="password"
            value={password}
            onChange={handleChange}
          />

          {/* Signup button */}
          <Button
            text="Bli Medlem"
            type="button"
            onClick={(e) => handleSubmit(e, "signup")}
          />
          <Button
            text="Logga in"
            type="button"
            variant="secondary"
            onClick={loginSignupToggle}
          />
          {emailError && <p>{emailError}</p>}
          {passwordError && <p>{passwordError}</p>}
        </>
      )}
    </form>
  );
}
