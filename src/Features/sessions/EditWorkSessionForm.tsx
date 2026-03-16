import { ChangeEvent, FormEvent, useState } from "react";
import { useAuth } from "../../contexts/useAuth";
import type { SessionData } from "../../contexts/sessions/types";
import Button from "../../components/ui/button/Button";
import Input from "../../components/ui/input";
import Select from "../../components/ui/select/Select";
import TextArea from "../../components/ui/textArea/TextArea";
import MoodPicker from "../mood/MoodPicker";

type FormProps = {
  handleSubmit: (e: FormEvent<HTMLFormElement>, formData: SessionData) => void, 
  initialData: SessionData
}

export default function EditWorkSessionForm({handleSubmit, initialData}: FormProps) {

  // State för att lagra arbetspassets information 
  const [formData, setFormData] = useState<SessionData>(initialData);
  const [pauseTime, setPauseTime] = useState(0)
  
  // Räknar ut active_time_ms från start-, stopp- och paustid
  const calculateActiveTime = (pause: number) :string => {
    const start = Date.parse(formData.startedAt)
    const end = Date.parse(formData.endedAt)
    const time = end - start - (pause * 10000)
    const readableTime = new Date(time)
    return `Aktiv tid: ${readableTime.getUTCHours()} timmar och ${readableTime.getMinutes()} minuter`
  }

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

      <label>Stopptid</label>
      <input
        type="datetime-local"
        name="ended_at"
        value={formData.endedAt}
        onChange={handleChange}
      />
      <p id="activeTime">{calculateActiveTime(pauseTime)}</p>

      <label>Paus (minuter)</label>  
      <input 
        type="number" 
        name="pause"
        value={pauseTime}
        onChange={handleChange} 
        min={0}
        max={
          Math.floor((Date.parse(formData.endedAt) - Date.parse(formData.startedAt)) / 60000)
        }
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