import { useState } from "react";
import Button from "../../components/ui/button/Button";
import Input from "../../components/ui/input";
import Select from "../../components/ui/select/Select";
import TextArea from "../../components/ui/textArea/TextArea";
import MoodPicker from "../mood/MoodPicker";
import { useAuth } from "../../contexts/useAuth";
import { sessionStore } from "../../storage/localStorage";
import saveSession from "../../supabase/saveSession";

function WorkSessionForm({ handleCloseModal, handleSessionSaved, timerData }) {
  const { user, isAuthed } = useAuth();

  // timerData{
    // activeTime: <Number> klockad tid i ms
    // startedAt: <Number> timestamp vid start i ms
    // endedAt: <Number> timestamp vid stopp i ms
    // }
 console.log("timerData:", timerData)
  // State för att lagra arbetspassets information (titel, kategori, kommentar)
  const [workSession, setWorkSession] = useState({
    startedAt: timerData.startedAt,
    endedAt: timerData.endedAt,
    activeTime: timerData.activeTime,
    title: "",
    category: "",
    comment: "",
    mood: 0,
  });

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
      // ...timerData,
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
        value={new Date(workSession.startedAt).toISOString().slice(0, -5)}
        onChange={handleChange}
      />

      <Input
        type="datetime-local"
        label="Stoptid"
        name="endedAt"
        value={new Date(workSession.endedAt).toISOString().slice(0, -5)}
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
export default WorkSessionForm;
