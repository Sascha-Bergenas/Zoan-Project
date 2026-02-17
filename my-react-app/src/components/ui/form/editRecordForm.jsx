import { useState } from "react";
import Button from "../button/Button";
import Input from "../input";
import Select from "../select/Select";
import TextArea from "../textArea/TextArea";
import MoodPicker from "../../../Features/mood/MoodPicker";
import { useAuth } from "../../../contexts/useAuth";
import { sessionStore } from "../../../storage/localStorage";
import saveSession from "../../../supabase/saveSession";

export default function EditRecordForm({ handleCloseModal, handleSessionSaved, sessionData }) {
  const { user, isAuthed } = useAuth();

  // timerData{
    // activeTime: <Number> klockad tid i ms
    // startedAt: <Number> timestamp vid start i ms
    // endedAt: <Number> timestamp vid stopp i ms
    // }
 
  console.log("sessionData:", sessionData)

  // State för att lagra arbetspassets information 
  const [workSession, setWorkSession] = useState({
    startedAt: sessionData?.startedAt,
    endedAt: sessionData?.endedAt,
    activeTime: sessionData?.activeTime,
    title: "",
    category: "",
    comment: "",
    mood: 0,
  });

  // const toLocalTime = (time) => {
  //   return new Date(time.getTime() - time.getTimezoneOffset() * 60000).toISOString.slice(0, -5)
  // }
  // Hanterar ändringar i input-fält genom att uppdatera state
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    // Uppdaterar state med det nya värdet från det ändrade fältet
    setWorkSession((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Hanterar formulärskickning - rensar formulär och state
  const handleSubmit = async (e) => {
    e.preventDefault();

    const sessionToSave = {
      ...workSession,
    };

    try {
      if (isAuthed) {
        await saveSession(user.id, sessionToSave);
        handleSessionSaved?.()
        console.log("sparat till db");
      } else {
        sessionStore.add(sessionToSave);
        console.log("sparat till local");
      }

      // Nollställer state
      setWorkSession({ 
        endedAt: 0, 
        startedAt: 0, 
        activeTime: 0, 
        title: "", 
        category: "", 
        comment: "", 
        mood: 0 
      });

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
    {/* Fält för att ange sessionens tider */}
      <Input
        type="datetime-local"
        label="Starttid"
        name="startedAt"
        value={workSession.startedAt}
        onChange={handleChange}
      />

      <Input
        type="datetime-local"
        label="Stoptid"
        name="endedAt"
        value={workSession.endedAt}
        // value={new Date(workSession.endedAt).toISOString().slice(0, -5)}
        onChange={handleChange}
      />

        
      <Input 
        type="time" 
        label="Varaktighet"
        name="activeTime"
        value={new Date(workSession.activeTime).toLocaleTimeString()}
        onChange={handleChange} 
        />

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