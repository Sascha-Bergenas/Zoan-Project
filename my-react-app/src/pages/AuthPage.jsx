import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function AuthPage(){
    const { signIn, signOut } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleLogin(e) {
        e.preventDefault();
        const { error } = await signIn(email, password);
        if (error) console.error(error);
        console.log('logged in as', email)
    }

    return (
        <>
        <form onSubmit={handleLogin}>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email"></input>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="pass"></input>
            <button type="submit">login</button>
        </form>
        <button onClick={signOut}>logout</button>
        </>
    )
}