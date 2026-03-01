// This file contains the Context contract

import type { SessionData } from "../../types/sessions";

// Data > Lista med poster
export type SessionsList = SessionData[]

// Info till UI-komponenter >  Visa "Loading" | Visa "Failed"
export type ListStatus = 
    | {type: "isLoading" }
    | {type: "isFailed" }

// Actions > Skapa ny post | Uppdatera befintlig post | Ta bort post | Ladda om poster 
export type DataActions = {
    saveSession: (sessionData: SessionData) => void,
    updateSession: (sesstionData: SessionData) => void,
    deleteSession: (sesstionData: SessionData) => void,
    loadSession: (sesstionData: SessionData) => void,
}