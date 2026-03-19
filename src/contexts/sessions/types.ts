// Detta utgör kontraktet för SessionContext
export type Mood = 1 | 2 | 3 | 4 | 5 | null;
// Datamodell för databasen
export type SessionData = {
    session_id: string,
    user_id?: string | null,
    title: string,
    category: "Arbete" | "Möte" | "Studier" | "",
    mood: Mood,
    comment: string,
    active_time_ms: number;
    started_at: string;
    ended_at: string;
    created_at?: string;
}

// Lista med poster
export type SessionsList = SessionData[]

// Formulärdatamodell
export type SessionFormData = {
    title: string,
    category: "Arbete" | "Möte" | "Studier" | "",
    mood: Mood,
    comment: string,
    activeTime: number,
    startedAt: string,
    endedAt: string,
}


// Info till UI-komponenter >  Visa "Loading" | Visa "Failed" | Visa listan
export type SessionsStatus = 
    | {type: "isLoading" }
    | {type: "isFailed" }
    | {type: "isOk"}

// Actions > Skapa ny post | Uppdatera befintlig post | Ta bort post | Ladda om poster 
export type DataActions = {
    save: (newSession: SessionFormData) => Promise<void>,
    update: (sessionData: SessionData) => Promise<void>,
    delete: (sessionId: SessionData["session_id"]) => Promise<void>,
    loadSessions: () => Promise<void>,
}

export function toSessionFormData(session: SessionData): SessionFormData {
    return {
      title: session.title,
      category: session.category,
      mood: session.mood,
      comment: session.comment,
      activeTime: session.active_time_ms,
      startedAt: session.started_at.slice(0, 16),
      endedAt: session.ended_at.slice(0, 16),
    };
  }

  export function toUpdatedSessionData(
    formData: SessionFormData,
    existingSession: SessionData
  ): SessionData {
    return {
      ...existingSession,
      title: formData.title,
      category: formData.category,
      mood: formData.mood,
      comment: formData.comment,
      active_time_ms: formData.activeTime,
      started_at: formData.startedAt,
      ended_at: formData.endedAt,
    };
  }