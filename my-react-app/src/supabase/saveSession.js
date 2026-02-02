import supabase from "./supabase";

export default async function saveSession(user, payload) {
  if (!user) return;

  const sessionData = {
    user_id: user,
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
    .insert(sessionData)
    .select()
    .single();
  if (error) throw error;

  return data;
}
