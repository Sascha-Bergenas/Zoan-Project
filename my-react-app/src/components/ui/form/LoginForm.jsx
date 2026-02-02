import { useState } from "react";
import Button from "../Button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(true);

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    }

    if (name === "password") {
      setPassword(value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert(email);
  }

  function loginSignupToggle() {
    setIsSignedUp((prev) => !prev);
  }

  return (
    <form>
      {isSignedUp ? (
        <>
          <div>
            <input
              name="email"
              placeholder="E-post"
              type="text"
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
          <Button text="Logga in" type="button" />
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
            type="text"
            value={email}
            onChange={handleChange}
          />
          <input
            name="name"
            placeholder="Namn"
            type="text"
            /* value={password} */
            onChange={handleChange}
          />
          <input
            name="password"
            placeholder="Lösenord"
            type="password"
            value={password}
            onChange={handleChange}
          />
          <input
            name="password"
            placeholder="Upprepa Lösenord"
            type="password"
            /* value={password} */
            onChange={handleChange}
          />
          <Button text="Bli Medlem" type="button" />
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
