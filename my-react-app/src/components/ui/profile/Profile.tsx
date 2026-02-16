import { useEffect, useState } from "react";
import supabase from "../../../supabase/supabase";
import "./Profile.css";

type UserProfile = {
  id: string;
  username: string | null;
  avatar_url: string | null;
  break_length: number | null;
  break_frequency: number | null;
};

const DEFAULT_AVATAR =
  "https://m.media-amazon.com/images/S/pv-target-images/7ca14fe3bd272e79963756a241fc66840ba860e01239407378e3c67e82477f16._SX1080_FMjpg_.jpg";

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("user_profile")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setProfile(data as UserProfile);
    }

    loadProfile();
  }, []);

  async function uploadAvatar(file: File) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    // upload image to storage
    const filePath = `${user.id}.png`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (error) {
      console.error(error);
      return;
    }

    // get public URL
    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

    const avatarUrl = data.publicUrl;

    // save URL to database
    await supabase
      .from("user_profile")
      .update({ avatar_url: avatarUrl })
      .eq("id", user.id);

    // update UI
    setProfile((p) => (p ? { ...p, avatar_url: avatarUrl } : p));
  }

  if (!profile) return <p>Ingen profil hittad</p>;

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        style={{ color: "transparent" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadAvatar(file);
        }}
      />
      <h3 className="text-lg">Välkommen, {profile.username}!</h3>
      <img
        src={(profile.avatar_url ?? DEFAULT_AVATAR) + "?t=" + Date.now()}
        alt="avatar"
        width={80}
      />
    </div>
  );
}
