import { ChangeEvent, useEffect, useState } from "react";
import BaseCard from "../../components/ui/cards/Card";
import { useTimer } from "../../contexts/TimerContext";
import {
  getCurrentUser,
  updateUsername,
  uploadAvatar,
  getUserProfile
} from "./settingComponents/userService";

import "./SettingsPage.css";

const DEFAULT_AVATAR =
  "https://m.media-amazon.com/images/S/pv-target-images/7ca14fe3bd272e79963756a241fc66840ba860e01239407378e3c67e82477f16._SX1080_FMjpg_.jpg";

const SettingsPage = () => {
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarVersion, setAvatarVersion] = useState<number>(Date.now());
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [savedMessage, setSavedMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const { breakSettings, setBreakSettings } = useTimer();

  // Hämta userId
  useEffect(() => {
    async function loadUser() {
      const user = await getCurrentUser();
      if (!user) return;

      setUserId(user.id);

      const profile = await getUserProfile(user.id);

      setUsername(profile.username ?? "");
      setAvatarUrl(profile.avatar_url ?? null);
    }

    loadUser();
  }, []);

  // Cleanup preview
  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  //  ändra Username
  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleSaveUsername = async () => {
    if (!userId) return;

    await updateUsername(userId, username);

    setSavedMessage("Sparat!");
    setTimeout(() => setSavedMessage(""), 2000);
  };

  //  Ändra Avatar
  const handleSelectImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    const nextPreview = URL.createObjectURL(file);

    setSelectedFile(file);
    setPreviewUrl(nextPreview);
  };

  // Ladda upp Avatar
  const handleUploadAvatar = async () => {
    if (!userId || !selectedFile) return;

    const newAvatarUrl = await uploadAvatar(userId, selectedFile);

    setAvatarUrl(newAvatarUrl);
    setAvatarVersion(Date.now());
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  // Break settings
  const handleBreakDeep = (e: ChangeEvent<HTMLInputElement>) => {
    setBreakSettings((prev) => ({
      ...prev,
      deepMin: Number(e.target.value)
    }));
  };

  const handleBreakMeeting = (e: ChangeEvent<HTMLInputElement>) => {
    setBreakSettings((prev) => ({
      ...prev,
      meetingMin: Number(e.target.value)
    }));
  };

  const persistedImageSrc = avatarUrl
    ? `${avatarUrl}?t=${avatarVersion}`
    : DEFAULT_AVATAR;

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
            onClick={handleUploadAvatar}
            disabled={!selectedFile}
          >
            Ladda upp vald bild
          </button>

          {/* Uppdatering av användarnamn */}
          <div className="settings-username-section">
            <label htmlFor="username">Användarnamn</label>
            <input
              id="username"
              data-testid="username-input"
              className="settings-username-input"
              type="text"
              value={username}
              onChange={handleChangeUsername}
            />
            <button
              className="settings-username-button"
              type="button"
              data-testid="save-username-button"
              onClick={handleSaveUsername}
            >
              Spara användarnamn
            </button>
            {savedMessage && (
              <p
                data-testid="success-username-message"
                className="settings-save-message"
              >
                {savedMessage}
              </p>
            )}
          </div>

          {/* Uppdatering av rast-inställningar */}

          <div className="settings-break-section">
            <h3>Inställning för rast</h3>

            <label className="settings-break-label">
              Deep Work
              <input
                type="number"
                min={1}
                max={240}
                value={breakSettings.deepMin}
                onChange={handleBreakDeep}
                className="settings-break-input"
              />
            </label>

            <label className="settings-break-label">
              Meeting
              <input
                type="number"
                min={1}
                max={240}
                value={breakSettings.meetingMin}
                onChange={handleBreakMeeting}
                className="settings-break-input"
              />
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
