import supabase from "../../../supabase/supabase";

export async function getCurrentUser() {
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user;
}

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from("user_profile")
    .select("username, avatar_url")
    .eq("id", userId)
    .single();

  if (error) throw error;

  return data;
}

export async function updateUsername(userId: string, username: string) {
  const { error } = await supabase
    .from("user_profile")
    .update({ username })
    .eq("id", userId);

  if (error) throw error;
}

export async function uploadAvatar(userId: string, file: File) {
  const filePath = `${userId}.png`;

  const { error } = await supabase.storage
    .from("avatars")
    .upload(filePath, file, { upsert: true });

  if (error) throw error;

  const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

  const avatarUrl = data.publicUrl;

  await supabase
    .from("user_profile")
    .update({ avatar_url: avatarUrl })
    .eq("id", userId);

  return avatarUrl;
}
