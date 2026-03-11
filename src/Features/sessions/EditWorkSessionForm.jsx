import { useState } from "react";
import Button from "../../components/ui/button/Button";
import Input from "../../components/ui/input";
import Select from "../../components/ui/select/Select";
import TextArea from "../../components/ui/textArea/TextArea";
import MoodPicker from "../mood/MoodPicker";
import { useAuth } from "../../contexts/useAuth";
import { sessionStore } from "../../storage/localStorage";
import saveSession from "../../supabase/saveSession";

export default function EditWorkSessionForm({ handleCloseModal, handleSessionSaved, sessionData }) {
  const { user, isAuthed } = useAuth();

  // State för att lagra arbetspassets information 
  const [workSession, setWorkSession] = useState({
    startedAt: sessionData?.startedAt,
    endedAt: sessionData?.endedAt,
    activeTime: sessionData?.activeTime,
    title: sessionData?.title ?? "",
    category: sessionData?.category ?? "",
    comment: sessionData?.comment ?? "",
    mood: sessionData?.mood ?? 0,
  });
  
  // Funktioner för att begränsa activeTime till tidsspannet mellan start och stopp
    const toMinutes = (hhmm = "00:00") => {
      const [h, m] = hhmm.split(":").map(Number);
      return h * 60 + m;
    };

    const toHHMM = (mins = 0) => {
      const h = String(Math.floor(mins / 60)).padStart(2, "0");
      const m = String(mins % 60).padStart(2, "0");
      return `${h}:${m}`;
    };

    const getMaxActiveMinutes = (start, end) => {
      if (!start || !end) return 0;
      const diffMs = new Date(end).getTime() - new Date(start).getTime();
      return Math.max(0, Math.floor(diffMs / 60000));
    };

    const maxActiveMinutes = getMaxActiveMinutes(workSession.startedAt, workSession.endedAt);
    const maxActiveHHMM = toHHMM(maxActiveMinutes);
  // ------------------------------------------------------------------------------


  // Hanterar ändringar i input-fält genom att uppdatera state
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Uppdaterar state med det nya värdet från det ändrade fältet
    setWorkSession((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Hanterar formulär - rensar formulär och state
  const handleSubmit = async (e) => {
    e.preventDefault();

    const sessionToSave = {
      ...workSession,
    };
    
    const activeMinutes = toMinutes(sessionToSave.activeTime);
    if (activeMinutes > maxActiveMinutes) {
      alert(`Aktiv tid får vara max ${maxActiveHHMM}`);
      return;
    }
    
    // Ett nödvändigt ont för att konvertera "HH:MM" till ms för att matcha fältet i databasen:
    sessionToSave.activeTime = 
      Number(sessionToSave.activeTime.slice(0, 2)) * 3600000 + 
      Number(sessionToSave.activeTime.slice(3, 5)) * 60000

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
        endedAt: new Date(0).toLocaleString(), 
        startedAt: new Date(0).toLocaleString(), 
        activeTime: "00:00", 
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
        label="Stopptid"
        name="endedAt"
        value={workSession.endedAt}
        onChange={handleChange}
      />

        
      <Input 
        type="time" 
        label="Varaktighet"
        name="activeTime"
        value={workSession.activeTime}
        onChange={handleChange} 
        min="00:00"
        max={maxActiveHHMM}
        step={60}
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