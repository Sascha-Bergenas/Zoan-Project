export type SessionData = {
    user_id: string, // TESTA OM DETTA STÄMMER!!
    title: string,
    category: "Arbete" | "Möte" | "Studier" | "",
    mood: 1 | 2 | 3 | 4 | 5 | null,
    comment: string,
    active_time_ms: number,
    started_at: string,
    ended_at: string,
}