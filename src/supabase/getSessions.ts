import supabase from "./supabase";
import type { SessionData } from "../types/sessions";

export default async function getSessions(): Promise<SessionData[]> {
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .order("started_at", { ascending: false });

  if (error) console.error(error);

  return (data ?? []) as SessionData[];
}
