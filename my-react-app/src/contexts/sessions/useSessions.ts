import { useContext } from "react";
import { SessionsContext } from "./SessionsContext";

export default function useSessions() {
    const context = useContext(SessionsContext)
    if (!context) throw new Error("useSessions must be used within an SessionsProvider");
    return context
};