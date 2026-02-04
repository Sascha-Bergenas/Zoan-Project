import { useState } from "react";
import Button from "../Button";
import { useAuth } from "../../../contexts/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(true);

  const { signIn, signUp, user, isAuthed, signOut } = useAuth();

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    }

    if (name === "password") {
      setPassword(value);
    }
  }

  async function handleSubmit(e, action) {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (action === "login") {
      const { error } = await signIn(trimmedEmail, password);
      if (error) return alert(error.message);
      alert("logged in");
    }

    if (action === "signup") {
      const { error } = await signUp(trimmedEmail, password);
      if (error) return alert(error.message);
      alert("sign up");
    }

    setEmail("");
    setPassword("");
  }

  function loginSignupToggle() {
    setIsSignedUp((prev) => !prev);
  }

  return (
    <form onSubmit={handleSubmit}>
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

          {/* Log in button */}
          {!isAuthed && (
            <Button
              text="Logga in"
              type="submit"
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
            type="submit"
            onClick={(e) => handleSubmit(e, "signup")}
          />
          <Button
            text="Logga in"
            type="button"
            variant="secondary"
            onClick={loginSignupToggle}
          />
        </>
      )}
    </form>
  );
}
