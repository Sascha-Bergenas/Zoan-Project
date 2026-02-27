import { ChangeEvent, useEffect, useState } from "react";
import supabase from "../../supabase/supabase";
import BaseCard from "../../components/ui/cards/Card";
import { useTimer } from "../../contexts/TimerContext";
import "./SettingsPage.css";

type UserProfile = {
  avatar_url: string | null;
};

const DEFAULT_AVATAR =
  "https://m.media-amazon.com/images/S/pv-target-images/7ca14fe3bd272e79963756a241fc66840ba860e01239407378e3c67e82477f16._SX1080_FMjpg_.jpg";

const SettingsPage = () => {
  const [username, setUsername] = useState<string>("");
  // Sparar aktuell profilbilds-URL från databasen.
  const [profile, setProfile] = useState<UserProfile | null>(null);
  // Håller filen som användaren har valt men ännu inte laddat upp.
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // Tillfällig lokal URL för förhandsgranskning av vald bild.
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // Används som cache-buster så nyuppladdad bild visas direkt.
  const [avatarVersion, setAvatarVersion] = useState<number>(Date.now());
  // Sparad feedback på ändrat användarnamn
  const [savedMessage, setSavedMessage] = useState<string>("");

  const { breakSettings, setBreakSettings } = useTimer();

  useEffect(() => {
    // Hämtar användarens profildata när sidan laddas.
    async function loadProfile() {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data, error } = await supabase
        .from("user_profile")
        .select("username, avatar_url")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      setProfile({ avatar_url: data.avatar_url });
      setUsername(data.username ?? "");
    }

    loadProfile();
  }, []);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  async function uploadAvatar(file: File) {
    const {
      data: { user }
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
    setProfile((p) =>
      p ? { ...p, avatar_url: avatarUrl } : { avatar_url: avatarUrl }
    );
    setAvatarVersion(Date.now());
    setSelectedFile(null);
    setPreviewUrl(null);
  }

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  async function updateUsername() {
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("user_profile")
      .update({ username })
      .eq("id", user.id);

    if (error) {
      console.error(error);
      return;
    }

    setSavedMessage("Sparat!");
    window.setTimeout(() => setSavedMessage(""), 2000);
  }

  // Skapar en lokal preview när en ny bild väljs.
  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    const nextPreviewUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(nextPreviewUrl);
  };

  const handleBreakDeep = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setBreakSettings((prev) => ({ ...prev, deepMin: val }));
  };
  
  const handleBreakMeeting = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setBreakSettings((prev) => ({ ...prev, meetingMin: val }));
  };
  
  const persistedImageSrc = profile?.avatar_url
    ? `${profile.avatar_url}${profile.avatar_url.includes("?") ? "&" : "?"}t=${avatarVersion}`
    : DEFAULT_AVATAR;

  // Visar preview om den finns, annars sparad profilbild.
  const imageSrc = previewUrl ?? persistedImageSrc;

  return (
    <section className="settings-wrapper">
      <div className="settings-container">
        <h2>Inställningar</h2>

        <BaseCard className="settings-card" size="card-medium">
          {/* Visning av nuvarande bild eller vald förhandsgranskning */}
          <div className="settings-avatar-section">
            <img className="settings-avatar" src={imageSrc} alt="Profilbild" />
            <p className="settings-avatar-text">
              {previewUrl ? "Förhandsgranskning" : "Nuvarande profilbild"}
            </p>
          </div>

          {/* Filval för ny profilbild */}
          <label className="settings-file-label" htmlFor="avatarUpload">
            Välj ny profilbild
          </label>
          <input
            id="avatarUpload"
            className="settings-file-input"
            type="file"
            accept="image/*"
            onChange={handleSelectImage}
          />

          {/* Uppladdning av vald bild */}
          <button
            className="settings-upload-button"
            type="button"
            onClick={() => selectedFile && uploadAvatar(selectedFile)}
            disabled={!selectedFile}
          >
            Ladda upp vald bild
          </button>

          {/* Uppdatering av användarnamn */}
          <div className="settings-username-section">
            <label htmlFor="username">Användarnamn</label>
            <input
              id="username"
              className="settings-username-input"
              type="text"
              value={username}
              onChange={handleChangeUsername}
            />
            <button
              className="settings-username-button"
              type="button"
              onClick={updateUsername}
            >
              Spara användarnamn
            </button>
            {savedMessage && (
              <p className="settings-save-message">{savedMessage}</p>
            )}
          </div>

          {/* Uppdatering av rast-inställningar */}

          <div className="settings-break-section">
            <h3>Längd på arbetspass</h3>

            <label className="settings-break-label">
              Deep Work
              <input
                type="range"
                min={5}
                max={120}
                step={5}
                value={breakSettings.deepMin}
                onChange={handleBreakDeep}
                className="settings-break-input"
              />
              <p> {breakSettings.deepMin} min</p>
            </label>

            <label className="settings-break-label">
              Möte
              <input
                type="range"
                min={5}
                max={120}
                step={5}
                value={breakSettings.meetingMin}
                onChange={handleBreakMeeting}
                className="settings-break-input"
              />
                 <p> {breakSettings.meetingMin} min</p>
            </label>
            <p className="settings-break-hint">
              Sparas automatiskt och används när du väljer mode.
            </p>
          </div>
        </BaseCard>
      </div>
    </section>
  );
};

export default SettingsPage;
