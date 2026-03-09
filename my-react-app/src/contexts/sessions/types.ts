// Detta utgör kontraktet för SessionContext

import type { SessionData } from "../../types/sessions";

// Data > Lista med poster
export type SessionsList = SessionData[]

// Info till UI-komponenter >  Visa "Loading" | Visa "Failed" | Visa listan
export type SessionsStatus = 
    | {type: "isLoading" }
    | {type: "isFailed" }
    | {type: "isOk"}

// Actions > Skapa ny post | Uppdatera befintlig post | Ta bort post | Ladda om poster 
export type DataActions = {
    save: (newSession: SessionData) => Promise<void>,
    update: (sessionData: SessionData) => Promise<void>,
    delete: (sessionId: SessionData["session_id"]) => Promise<void>,
    loadSessions: () => Promise<void>,
}

