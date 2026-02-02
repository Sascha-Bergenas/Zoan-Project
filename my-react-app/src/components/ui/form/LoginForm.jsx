import { useState } from "react";
import Button from "../Button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(false);

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
      <div>
        {isSignedUp ? (
          <>
            <div>
              <label>E-post</label>
              <input
                name="email"
                type="text"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Lösenord</label>
              <input
                name="password"
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
            <p>Logga in</p>
          </>
        ) : (
          <>
            <div>
              <label>E-post</label>
              <input
                name="email"
                type="text"
                value={email}
                onChange={handleChange}
              />
              <label>Namn</label>
              <input
                name="name"
                type="text"
                /* value={password} */
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Lösenord</label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
              />
              <label>Upprepa Lösenord</label>
              <input
                name="password"
                type="password"
                /* value={password} */
                onChange={handleChange}
              />
            </div>
            <Button text="Bli Medlem" type="button" />
            <Button
              text="Logga in"
              type="button"
              variant="secondary"
              onClick={loginSignupToggle}
            />
            <p>Bli medlem</p>
          </>
        )}
      </div>
    </form>
  );
}
