import { useState } from "react";
import Button from "../Button";
import { useAuth } from "../../../contexts/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(true);

  const { signIn, signUp, user, isAuthed } = useAuth();

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    }

    if (name === "password") {
      setPassword(value);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const trimmedEmail = email.trim();

    const { error } = isSignedUp
      ? await signIn(trimmedEmail, password)
      : await signUp(trimmedEmail, password);

    if (!error) alert("Success");
    if (error) alert(error.message);
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
          <Button text="Logga in" type="submit" />
          <Button
            text="Bli medlem"
            type="button"
            variant="secondary"
            onClick={loginSignupToggle}
          />

          {isAuthed && <div>Inloggad som: {user.email}</div>}
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
          {/*  <input
            name="name"
            placeholder="Namn"
            type="text"
            onChange={handleChange}
          /> */}
          <input
            name="password"
            placeholder="Lösenord"
            type="password"
            value={password}
            onChange={handleChange}
          />
          {/*     <input
            name="password"
            placeholder="Upprepa Lösenord"
            type="password"
            onChange={handleChange}
          /> */}
          <Button text="Bli Medlem" type="submit" />
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
