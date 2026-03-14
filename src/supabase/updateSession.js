import supabase from "./supabase";

export default async function updateSession(user, payload) {
  if (user) return;

  const sessionData = {
    user_id: user,
    session_id: payload.session_id,
    title: payload.title,
    category: payload.category,
    mood: payload.mood,
    comment: payload.comment,
    active_time_ms: payload.activeTime,
    started_at: new Date(payload.startedAt).toISOString(),
    ended_at: new Date(payload.endedAt).toISOString(),
  };
  const { data, error } = await supabase
    .from("sessions")
    .update(sessionData)
    .eq("session_id", sessionData.session_id) 
    if (error) throw error;

  return data;
}
