import { useState, useEffect } from "react";
import { SessionsContext, SessionsContextValue } from "./SessionsContext";
import { SessionsStatus, SessionData } from "./types";
import saveSession from "../../supabase/saveSession";
import updateSession from "../../supabase/updateSession";
import deleteSession from "../../supabase/deleteSession";
import getSessions from "../../supabase/getSessions";
import { useAuth } from "../useAuth";
import { localSessionActions } from "../../storage/localStorage";


export function SessionsProvider({ children }: {children: React.ReactNode}) {
    const { user } = useAuth() as { user: { id: string } | null };
    
    const [sessions, setSessions] = useState<SessionsContextValue["sessions"]>([]) 
    // const [sessionsList, setSessionsList] = useState<SessionsList>([]) 
    // Är det här alternativet vettigt??
    
    const [status, setStatus] = useState<SessionsStatus>({type: "isLoading"})
    
    useEffect(() => {
        actions.loadSessions();
      }, [user?.id]);

    const actions: SessionsContextValue["actions"] = {

        async save(newSession) {
          setStatus({ type: "isLoading" });
          try {
            if (!user) {
              const saved = localSessionActions.add(newSession);
              setSessions(prev => [saved, ...prev]);
            } else {
              const saved = await saveSession(user.id, newSession) as SessionData;
              setSessions(prev => [saved, ...prev]);
            }
            setStatus({ type: "isOk" });
          } catch (error) {
            setStatus({ type: "isFailed" });
            throw error;
          }
        },
      
        async update(sessionData) {
          setStatus({ type: "isLoading" });
          try {
            if (!user) {
              localSessionActions.update(sessionData);
            } else {
              await updateSession(user.id, {
                ...sessionData,
                activeTime: sessionData.active_time_ms,
                startedAt: sessionData.started_at,
                endedAt: sessionData.ended_at,
              });
            }
            setStatus({ type: "isOk" });
            setSessions(prev =>
              prev.map(s => s.session_id === sessionData.session_id ? sessionData : s)
            );
          } catch (error) {
            setStatus({ type: "isFailed" });
            throw error;
          }
        },
      
        async delete(session_id) {
          setStatus({ type: "isLoading" });
          try {
            if (!user) {
              localSessionActions.delete(session_id);
            } else {
              await deleteSession(user.id, session_id);
            }
            setStatus({ type: "isOk" });
            setSessions(prev => prev.filter(s => s.session_id !== session_id));
          } catch (error) {
            setStatus({ type: "isFailed" });
            throw error;
          }
        },
      
        async loadSessions() {
            setStatus({ type: "isLoading" });
          
            try {
              const sessions = !user
                ? localSessionActions.load()
                : await getSessions();
          
              setSessions(sessions);
              setStatus({ type: "isOk" });
            } catch (error) {
              setStatus({ type: "isFailed" });
              throw error;
            }
          },
      };
    
    const value: SessionsContextValue = {
        sessions: sessions, status, actions
    }


    return <SessionsContext.Provider value={value}>{ children }</SessionsContext.Provider>
}
