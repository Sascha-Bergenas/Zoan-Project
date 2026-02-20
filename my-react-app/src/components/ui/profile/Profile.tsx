import { useEffect, useState } from "react";
import supabase from "../../../supabase/supabase";
import "./Profile.css";

type UserProfile = {
  username: string | null;
  avatar_url: string | null;
};

const DEFAULT_AVATAR =
  "https://m.media-amazon.com/images/S/pv-target-images/7ca14fe3bd272e79963756a241fc66840ba860e01239407378e3c67e82477f16._SX1080_FMjpg_.jpg";

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("user_profile")
        //Hämtar specifikt username och avatar från supabase
        .select("username, avatar_url")
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

  if (!profile) return <p>Ingen profil hittad</p>;

  return (
    <div>
      <h3 className="text-lg">Välkommen, {profile.username}!</h3>
      <img
        className="profile-img"
        src={profile.avatar_url ?? DEFAULT_AVATAR}
        alt="avatar"
        width={80}
      />
    </div>
  );
}
