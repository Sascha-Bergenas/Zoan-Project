import { ChangeEvent, useState } from "react";
import type { SessionFormData } from "../../contexts/sessions/types";
import Button from "../../components/ui/button/Button";
import Input from "../../components/ui/input";
import Select from "../../components/ui/select/Select";
import TextArea from "../../components/ui/textArea/TextArea";
import MoodPicker from "../mood/MoodPicker";

type FormProps = {
  handleSubmit: (e: SubmitEvent, formData: SessionFormData) => void, 
  initialData?: SessionFormData
}

export default function EditWorkSessionForm({handleSubmit, initialData}: FormProps) {

  // State för att lagra arbetspassets information 
  const [formData, setFormData] = useState<SessionFormData>(
    initialData ?? {  
      startedAt: new Date().toLocaleString(),
      endedAt: new Date().toLocaleString(),
      active_time_ms: 0, 
      title: "",
      category: "",
      comment: "",
      mood: null,
  });
  const [pauseTime, setPauseTime] = useState(0)
  
  // Räknar ut active_time_ms från start-, stopp- och paustid
  const calculateActiveTime = (pause: number) => {
    const start = Date.parse(formData.startedAt)
    const end = Date.parse(formData.endedAt)
    let time = end - start - (pause * 10000)
    // TODO: Time ms -> to readable format
    return time
  }

  // // Funktioner för att begränsa activeTime till tidsspannet mellan start och stopp
  //   const toMinutes = (hhmm = "00:00") => {
  //     const [h, m] = hhmm.split(":").map(Number);
  //     return h * 60 + m;
  //   };

  //   const toHHMM = (mins = 0) => {
  //     const h = String(Math.floor(mins / 60)).padStart(2, "0");
  //     const m = String(mins % 60).padStart(2, "0");
  //     return `${h}:${m}`;
  //   };

  //   const getMaxActiveMinutes = (start, end) => {
  //     if (!start || !end) return 0;
  //     const diffMs = new Date(end).getTime() - new Date(start).getTime();
  //     return Math.max(0, Math.floor(diffMs / 60000));
  //   };

  //   const maxActiveMinutes = getMaxActiveMinutes(formData.started_at, formData.endedAt);
  //   const maxActiveHHMM = toHHMM(maxActiveMinutes);
  // // ------------------------------------------------------------------------------


  // Hanterar ändringar i input-fält genom att uppdatera state
  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { value, name } = e.target;
    
    // Uppdaterar state med det nya värdet från det ändrade fältet
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  
  return (
    // Formulär för att logga arbetspass-aktiviteter
    <form 
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(e, formData)
      }}
    >
    {/* Fält för att ange sessionens tider */}
      <label>Starttid</label>
      <input 
        type="datetime-local" 
        name="started_at" 
        value={formData.startedAt} 
        onChange={handleChange} 
      />
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
        name="ended_at"
        value={formData.endedAt}
        onChange={handleChange}
      />
      <p id="activeTime">Aktiv tid: {calculateActiveTime(pauseTime)}</p>

      <label>Paus (minuter)</label>  
      <input 
        type="number" 
        name="pause"
        value={pauseTime}
        onChange={handleChange} 
        min={0}
        max={calculateActiveTime(pauseTime)}
        step={1}
      />

      {/* Input-fält för aktivitetens titel */}
      <label>Aktivitet</label>
      <input
        type="text"
        name="title"
        placeholder="Vad har du jobbat med?"
        value={formData.title}
        onChange={handleChange}
      />
      {/* Dropdown för att välja aktivitetens kategori */}
      <label>Kategori</label>
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="">Välj Kategori</option>
        <option value="Arbete">Arbete</option>
        <option value="Studier">Studier</option>
        <option value="Möte">Möte</option>
      </select>

      <label>Kommentar</label>
      <textarea
        name="comment"
        value={formData.comment}
        onChange={handleChange}
        placeholder="Skriv en kommentar"
      />
      <MoodPicker
        value={formData.mood}
        onChange={(value: number | null) => {setFormData((prev) => ({ ...prev, mood: value }))}}
      ></MoodPicker>
      <Button type="submit" text="Logga" onClick={() => {}}/>
    </form>
  );
}