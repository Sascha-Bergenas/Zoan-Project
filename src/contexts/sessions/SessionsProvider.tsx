import { useState, useEffect } from "react";
import { SessionsContext, SessionsContextValue } from "./SessionsContext";
import { SessionsList, SessionsStatus, DataActions } from "./types";
import saveSession from "../../supabase/saveSession";
import updateSession from "../../supabase/updateSession";
import deleteSession from "../../supabase/deleteSession";
import getSessions from "../../supabase/getSessions";
// import { useAuth } from "../useAuth";


export function SessionsProvider({ children }: {children: React.ReactNode}) {
    //   const { user, isAuthed } = useAuth();
    const [sessions, setSessions] = useState<SessionsContextValue["sessions"]>([]) 
    // const [sessionsList, setSessionsList] = useState<SessionsList>([]) 
    // Är det här alternativet vettigt??
    
    const [status, setStatus] = useState<SessionsStatus>({type: "isLoading"})
    
    useEffect(() => {
        actions.loadSessions()
    }, [])

    const actions: SessionsContextValue["actions"] = {
        // TODO: localStorage om användaren inte är inloggad

        // Spara ny session
        async save(newSession) {
            setStatus({type: "isLoading"})

            try {
                await saveSession(newSession.user_id, newSession) // TODO: Ersätt user_id med det från auth
                console.log("Saving...");
                setStatus({type: "isOk"})
                setSessions(prev => [...prev, newSession])
            } catch (error) {
                setStatus({type: "isFailed"})
                throw error
            }
        }, 

        // Uppdatera tidigare session
        async update(sessionData) {
            setStatus({type: "isLoading"})
            
            try {
                await updateSession(sessionData.user_id, sessionData) // TODO: Ersätt user_id med det från auth
                setStatus({type: "isOk"})
                setSessions(prev => prev.map(session => 
                    session.session_id === sessionData.session_id
                        ? sessionData
                        : session
                ))
            } catch (error) {
                setStatus({type: "isFailed"})
                throw error
            }
        },

        // Radera tidigare session
        async delete(session_id) {
            setStatus({type: "isLoading"})
            
            try {
                await deleteSession(session_id)// TODO: lägg till check av user_id från auth
                setStatus({type: "isOk"})
                setSessions(prev => 
                    prev.filter(session => session.session_id !== session_id)
                )
            } catch (error) {
                setStatus({type: "isFailed"})
                throw error
            }
        },

        // Hämmta alla sessioner
        async loadSessions() {
            setStatus({type: "isLoading"})
            
            try {
                const sessions = await getSessions()
                setSessions(sessions)
                setStatus({type: "isOk"})
            } catch (error) {
                setStatus({type: "isFailed"})
                throw error
            }
        },
    }
    
    const value: SessionsContextValue = {
        sessions: sessions, status, actions
    }


    return <SessionsContext.Provider value={value}>{ children }</SessionsContext.Provider>
}

