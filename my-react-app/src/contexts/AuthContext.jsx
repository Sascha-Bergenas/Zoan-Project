import { createContext, useContext, useEffect, useState, useMemo } from "react";
import supabase from "../supabase/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
     
        supabase.auth.getSession().then(({ data, error }) => {
          if (!mounted) return;
          if (error) console.error(error);
          setSession(data?.session ?? null);
          setLoading(false);
        });
    

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, newSession) => {
              setSession(newSession);
              setLoading(false);
            }
          );
          return () => {
            mounted = false;
            subscription.unsubscribe();
          };
        }, []);

    const value = useMemo(() => {
        const user = session?.user ?? null;
    
        return {
            session,
            user,
            loading,
            isAuthed: !!user,
    
            signUp: (email, password) =>
            supabase.auth.signUp({ email, password }),
    
            signIn: (email, password) =>
            supabase.auth.signInWithPassword({ email, password }),
    
            signOut: () => supabase.auth.signOut(),
        };
        }, [session, loading]);

        return (
            <AuthContext.Provider value={value}>
              {loading ? <div style={{ padding: 24 }}>Loading…</div> : children}
            </AuthContext.Provider>
          );
        }

    export function useAuth() {
        const context = useContext(AuthContext);
        if (!context) throw new Error("useAuth must be used within an AuthProvider");
        return context;
        }