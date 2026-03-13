// Detta utgör kontraktet för SessionContext

// Datamodell för databasen
export type SessionData = {
    session_id: string,
    user_id: string,
    title: string,
    category: "Arbete" | "Möte" | "Studier" | "",
    mood: 1 | 2 | 3 | 4 | 5 | null,
    comment: string,
    active_time_ms: number,
    started_at: string,
    ended_at: string,
}

// Lista med poster
export type SessionsList = SessionData[]

// Formulärdatamodell
export type SessionFormData = {
    title: string,
    category: "Arbete" | "Möte" | "Studier" | "",
    mood: number | null,
    comment: string,
    active_time_ms: number,
    started_at: string,
    ended_at: string,
}


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

