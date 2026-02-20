import { useState, useRef } from "react";
import Button from "../../components/ui/button/Button";
import { useAuth } from "../../contexts/useAuth";
import supabase from "../../supabase/supabase";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [isSignedUp, setIsSignedUp] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPassWordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [username, setUserName] = useState("");

  const passwordRef = useRef(null);
  const repeatPasswordRef = useRef(null);

  const { signIn, signUp, user, isAuthed, signOut } = useAuth();

  //Switch between loginmode and signup mode
  function loginSignupToggle() {
    setIsSignedUp((prev) => !prev);
    setEmail("");
    setUserName("");
    setEmailError("");
    setPassWordError("");
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

    const password = passwordRef.current.value;
    const repeatPassword = repeatPasswordRef.current?.value;

    const trimmedEmail = email.trim().toLowerCase();
    if (!validateForm(trimmedEmail, password, repeatPassword)) return;

    if (action === "login") {
      const { error } = await signIn(trimmedEmail, password);
      if (error) return alert(error.message);
    }

    if (action === "signup") {
      const { data, error } = await signUp(trimmedEmail, password);
      if (error) return alert(error.message);

      const userId = data?.user?.id;
      if (userId) {
        const { error: profileError } = await supabase
          .from("user_profile")
          .upsert({ id: userId, username });
      }
    }

    setEmail("");
    passwordRef.current.value = "";
    repeatPasswordRef.current.value = "";
  }

  function validateForm(trimmedEmail, password, repeatPassword) {
    setEmailError("");
    setPassWordError("");

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

    if (!username.trim()) {
      setUsernameError("Skriv in ett användarnamn");
      return false;
    } else if (username.trim().length < 6) {
      setUsernameError("Ditt användarnamn måste vara minst 6 tecken.");
      return false;
    } else if (username.trim().length > 15) {
      setUsernameError("Användarnamnet får vara max 15 tecken.");
      return false;
    } else if (!/^[a-zA-ZåäöÅÄÖ]+$/.test(username)) {
      setUsernameError("Användarnamnet får endast innehålla bokstäver");
      return false;
    }

    if (!isSignedUp) {
      if (password !== repeatPassword) {
        setPassWordError("Lösenorden matchar inte.");
        return false;
      }
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
              ref={passwordRef}
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
        /* Sign up */
        <>
          <div>
            <input
              name="email"
              placeholder="E-post"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              name="password"
              placeholder="Lösenord"
              type="password"
              ref={passwordRef}
            />
            <input
              name="repeatPassword"
              placeholder="Upprepa lösenord"
              type="password"
              ref={repeatPasswordRef}
            />
            <input
              name="username"
              placeholder="Användarnamn"
              type="text"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
                setUsernameError("");
              }}
            />
          </div>

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
          {usernameError && <p>{usernameError}</p>}
        </>
      )}
    </form>
  );
}
