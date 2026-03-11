import { useState } from "react";
import type { SessionFormData } from "../../contexts/sessions/types";
import Button from "../../components/ui/button/Button";
import Input from "../../components/ui/input";
import Select from "../../components/ui/select/Select";
import TextArea from "../../components/ui/textArea/TextArea";
import MoodPicker from "../mood/MoodPicker";

export default function EditWorkSessionForm(handleSubmit: () => void, initialData?: unknown) {

  // State för att lagra arbetspassets information 
  const [formData, setFormData] = useState(
    initialData ?? {  
      started_at: new Date().toLocaleString(),
      ended_at: new Date().toLocaleString(),
      active_time_ms: undefined, 
      title: "",
      category: "",
      comment: "",
      mood: null,
  });
  
  const calculateActiveTime = (started_at: string, ended_at: string, pause: number) => {
    const start = new Date(started_at).getMilliseconds()
    const end = new Date(ended_at).getMilliseconds()
    const time = end - start - pause * 10000
    return time
  }

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

    const maxActiveMinutes = getMaxActiveMinutes(formData.startedAt, formData.endedAt);
    const maxActiveHHMM = toHHMM(maxActiveMinutes);
  // ------------------------------------------------------------------------------


  // Hanterar ändringar i input-fält genom att uppdatera state
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Uppdaterar state med det nya värdet från det ändrade fältet
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  return (
    // Formulär för att logga arbetspass-aktiviteter
    <form onSubmit={handleSubmit}>
    {/* Fält för att ange sessionens tider */}
      <label>Starttid</label>
      <input type="datetime-local" name="startedAt" value={formData.started_at} onChange={handleChange}/>
      {/* <Input
        type="datetime-local"
        label="Starttid"
        name="startedAt"
        value={formData.startedAt}
        onChange={handleChange}
      /> */}

      <label>Stopptid</label>
      <input
        type="datetime-local"
        name="endedAt"
        value={formData.ended_at}
        onChange={handleChange}
      />

      <label>Paus (minuter)</label>  
      <input 
        type="time" 
        name="activeTime"
        value={formData.activeTime}
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
        value={formData.title}
        onChange={handleChange}
      />
      {/* Dropdown för att välja aktivitetens kategori */}
      <Select
        label="Kategori"
        name="category"
        value={formData.category}
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
        value={formData.comment}
        onChange={handleChange}
        placeholder="Skriv en kommentar"
      />
      <MoodPicker
        value={formData.mood}
        onChange={(mood) => setFormData((prev) => ({ ...prev, mood }))}
      ></MoodPicker>
      <Button type="submit" text="Logga" />
    </form>
  );
}