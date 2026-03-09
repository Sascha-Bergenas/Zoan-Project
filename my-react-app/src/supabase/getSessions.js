import supabase from "./supabase";

export default async function getSessions() {
  let { data, error } = await supabase
    .from("sessions")
    .select("*")
    .order("started_at", {ascending: false});

  if (error) console.log(error);
  return data;
}
