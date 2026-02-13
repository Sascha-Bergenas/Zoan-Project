import { useState } from "react";
import Button from "../../components/ui/button/Button";
import Input from "../../components/ui/input";
import Select from "../../components/ui/select/Select";
import TextArea from "../../components/ui/textArea/TextArea";
import MoodPicker from "../mood/MoodPicker";
import { useAuth } from "../../contexts/useAuth";
import { sessionStore } from "../../storage/localStorage";
import saveSession from "../../supabase/saveSession";

function WorkSessionForm({ handleCloseModal, timerData }) {
  const { user, isAuthed } = useAuth();

  // State för att lagra arbetspassets information (titel, kategori, kommentar)
  const [workSession, setWorkSession] = useState({
    title: "",
    category: "",
    comment: "",
    mood: null
  });

  // Hanterar ändringar i input-fält genom att uppdatera state
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Uppdaterar state med det nya värdet från det ändrade fältet
    setWorkSession((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Hanterar formulärskickning - rensar formulär och state
  const handleSubmit = async (e) => {
    e.preventDefault();

    const sessionToSave = {
      ...workSession,
      ...timerData
    };

    try {
      if (isAuthed) {
        await saveSession(user.id, sessionToSave);
        console.log("sparat till db");
      } else {
        sessionStore.add(sessionToSave);
        console.log("sparat till local");
      }

      // Signalerar till kalendern att sessions har uppdaterats
      window.dispatchEvent(new CustomEvent("sessions:change"));

      // Nollställer state
      setWorkSession({ title: "", category: "", comment: "", mood: null });

      // Nollställer formulärets HTML-element
      e.target.reset();

      // Stänger modalen efter inlämning
      handleCloseModal();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    // Formulär för att logga arbetspass-aktiviteter
    <form onSubmit={handleSubmit}>
      {/* Input-fält för aktivitetens titel */}
      <Input
        type="text"
        label="Aktivitet"
        name="title"
        placeholder="Vad har du jobbat med?"
        value={workSession.title}
        onChange={handleChange}
      />
      {/* Dropdown för att välja aktivitetens kategori */}
      <Select
        label="Kategori"
        name="category"
        value={workSession.category}
        onChange={handleChange}
      >
        <option value="">Välj Kategori</option>
        <option value="Arbete">Arbete</option>
        <option value="Studier">Studier</option>
        <option value="Möte">Möte</option>
      </Select>

      <TextArea
        label="Kommentar"
        name="comment"
        value={workSession.comment}
        onChange={handleChange}
        placeholder="Skriv en kommentar"
      />
      <MoodPicker
        value={workSession.mood}
        onChange={(mood) => setWorkSession((prev) => ({ ...prev, mood }))}
      ></MoodPicker>
      <Button type="submit" text="Logga" />
    </form>
  );
}
export default WorkSessionForm;
