import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/useAuth";
import supabase from "../../../supabase/supabase";
import { User } from "@supabase/supabase-js";
import "./Profile.css";
import RandomQuote from "../../../Features/quotes/RandomQuote";

type UserProfile = {
  username: string | null;
  avatar_url: string | null;
};

const DEFAULT_AVATAR =
  "https://m.media-amazon.com/images/S/pv-target-images/7ca14fe3bd272e79963756a241fc66840ba860e01239407378e3c67e82477f16._SX1080_FMjpg_.jpg";

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const { user, isAuthed } = useAuth() as {
    user: User | null;
    isAuthed: boolean;
  };

  const date = new Date();
  const formattedDate = date
    .toLocaleDateString("sv-SE", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })
    .replace(/^\p{L}/u, (letter) => letter.toUpperCase());

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) return;
      if (!user) {
        setProfile(null);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("user_profile")
        //Hämtar specifikt username och avatar från supabase
        .select("username, avatar_url")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        console.error(error);
        setLoading(false);
        return;
      }

      setProfile(data as UserProfile);
      setLoading(false);
    }

    setLoading(true);
    loadProfile();
  }, [user]);

  async function uploadAvatar(file: File) {
    if (!user) return;

    const filePath = `${user.id}.png`;

    const { error } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    if (error) return console.error(error);

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
    const avatarUrl = data.publicUrl;

    await supabase
      .from("user_profile")
      .update({ avatar_url: avatarUrl })
      .eq("id", user.id);

    setProfile((p) => (p ? { ...p, avatar_url: avatarUrl } : p));
  }

  if (loading) return <p>Laddar...</p>;

  return !profile ? (
    <div className="profile-card">
      <p>{formattedDate}</p>
      <p style={{ paddingTop: "30px" }} className="text-bold text-lg">
        Ingen profil hittad.
      </p>
      <div className="avatar-wrapper">
        <img className="profile-img" src={DEFAULT_AVATAR} alt="" />
        <p style={{ paddingBottom: "30px" }}>
          Logga in för att se information.
        </p>
      </div>
      <RandomQuote size="20px" />
    </div>
  ) : (
    <div className="profile-card">
      {/* <input
        type="file"
        accept="image/*"
        style={{ color: "transparent" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadAvatar(file);
        }}
      /> */}
      <h3 className="text-lg">Välkommen, {profile.username}!</h3>
      <div className="avatar-wrapper">
        <img
          className="profile-img"
          src={profile.avatar_url ?? DEFAULT_AVATAR}
          alt="avatar"
          width={80}
        />
      </div>
      <RandomQuote size="18px" />
    </div>
  );
}
