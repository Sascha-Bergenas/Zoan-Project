import supabase from "./supabase";
import type { SessionData } from "../contexts/sessions/types";

export default async function getSessions(): Promise<SessionData[]> {
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .order("started_at", { ascending: false });

  if (error) {
    console.error(error);
    throw error;
  }

  return (data ?? []).map((row) => ({
    session_id: row.session_id,
    user_id: row.user_id,
    title: row.title,
    category: row.category,
    mood: row.mood,
    comment: row.comment,
    active_time_ms: row.active_time_ms,
    started_at: row.started_at,
    ended_at: row.ended_at,
    created_at: row.created_at,
  }));
}