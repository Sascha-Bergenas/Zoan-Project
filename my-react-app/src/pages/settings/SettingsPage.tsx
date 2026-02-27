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
  // Sparar aktuell profilbilds-URL från databasen.
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  // Används som cache-buster så nyuppladdad bild visas direkt.
  const [avatarVersion, setAvatarVersion] = useState<number>(Date.now());
  // Håller filen som användaren har valt men ännu inte laddat upp.
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // Tillfällig lokal URL för förhandsgranskning av vald bild.
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  // Sparad feedback på ändrat användarnamn
  const [savedMessage, setSavedMessage] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  // Paus inställningar
  const { breakSettings, setBreakSettings } = useTimer();

  // Hämtar användarens profildata när sidan laddas.
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

  // Skapar en lokal preview när en ny bild väljs.
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
    const val = Number(e.target.value);
    setBreakSettings((prev) => ({ ...prev, deepMin: val }));
  };

  const handleBreakMeeting = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setBreakSettings((prev) => ({ ...prev, meetingMin: val }));
  };

  const persistedImageSrc = avatarUrl
    ? `${avatarUrl}?t=${avatarVersion}`
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
            // test id
            data-testid="choose-file-input"
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
            //Test Id
            data-testid="disable-btn"
            disabled={!selectedFile}
          >
            Ladda upp vald bild
          </button>

          {/* Uppdatering av användarnamn */}
          <div className="settings-username-section">
            <label htmlFor="username">Användarnamn</label>
            <input
              id="username"
              //Test Id
              data-testid="username-input"
              className="settings-username-input"
              type="text"
              value={username}
              onChange={handleChangeUsername}
            />
            <button
              className="settings-username-button"
              type="button"
              //Test Id
              data-testid="save-username-button"
              onClick={handleSaveUsername}
            >
              Spara användarnamn
            </button>
            {savedMessage && (
              <p
                //Test Id
                data-testid="success-username-message"
                className="settings-save-message"
              >
                {savedMessage}
              </p>
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
          <div className="settings-beer-section">
            <h3>Öl på fredag?</h3>
            <div className="beer-options">
              <label>
                <input
                  type="radio"
                  name="beerOnFriday"
                  checked={breakSettings.beerOnFriday === true}
                  onChange={() =>
                    setBreakSettings((prev) => ({
                      ...prev,
                      beerOnFriday: true
                    }))
                  }
                />
                Ja
              </label>
              <label>
                <input
                  type="radio"
                  name="beerOnFriday"
                  checked={breakSettings.beerOnFriday === false}
                  onChange={() =>
                    setBreakSettings((prev) => ({
                      ...prev,
                      beerOnFriday: false
                    }))
                  }
                />
                Nej
              </label>
            </div>
          </div>
        </BaseCard>
      </div>
    </section>
  );
};

export default SettingsPage;
