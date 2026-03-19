import { createContext } from "react";
import { SessionsList, SessionsStatus, DataActions } from "./types";

export type SessionsContextValue = {
    sessions: SessionsList,
    status: SessionsStatus,
    actions: DataActions,
}

export const SessionsContext = createContext<SessionsContextValue | undefined>(undefined)