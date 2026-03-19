import supabase from "./supabase";

export default async function deleteSession(user, session_id) {
  //   if (!user) return;

  const { data, error } = await supabase
    .from("sessions")
    .delete()
    .eq("id", session_id);
  if (error) throw error;

  return data;
}
