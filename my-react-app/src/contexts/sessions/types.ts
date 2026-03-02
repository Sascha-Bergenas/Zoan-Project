// Detta utgör kontraktet för SessionContext

import type { SessionData } from "../../types/sessions";

// Data > Lista med poster
export type SessionsList = SessionData[]

// Info till UI-komponenter >  Visa "Loading" | Visa "Failed"
export type ListStatus = 
    | {type: "isLoading" }
    | {type: "isFailed" }
    | {type: "isOk "}

// Actions > Skapa ny post | Uppdatera befintlig post | Ta bort post | Ladda om poster 
export type DataActions = {
    saveSession: (newSession: SessionData) => void,
    updateSession: (sessionData: SessionData) => void,
    deleteSession: (sessionId: SessionData["session_id"]) => void,
    loadSessions: () => void,
}