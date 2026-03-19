import { useState } from "react";
import type { Mood, SessionFormData } from "../../contexts/sessions/types";
import Button from "../../components/ui/button/Button";
import Input from "../../components/ui/input";
import Select from "../../components/ui/select/Select";
import TextArea from "../../components/ui/textArea/TextArea";
import MoodPicker from "../mood/MoodPicker";
import styles from "./EditWorkSessionForm.module.css"

type Props = {
  handleSubmit: (formData: SessionFormData) => void;
  initialData?: SessionFormData | undefined;
};

export default function EditWorkSessionForm({ handleSubmit, initialData }: Props){

  // State för att lagra arbetspassets information 
  const [formData, setFormData] = useState<SessionFormData>(
    initialData ?? {  
      startedAt: new Date().toLocaleString(),
      endedAt: new Date().toLocaleString(),
      activeTime: 0, 
      title: "",
      category: "",
      comment: "",
      mood: null,
  });
  const [pauseTime, setPauseTime] = useState(0)
  
// Räknar ut active_time_ms från start-, stopp- och paustid
const calculateActiveTime = (pause: number) :string => {
  const start = Date.parse(formData.startedAt)
  const end = Date.parse(formData.endedAt)
  const time = end - start - (pause * 60000)
  const readableTime = new Date(time)
  return `Aktiv tid: ${readableTime.getUTCHours()} timmar och ${readableTime.getMinutes()} minuter`
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
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    if (name === "pause") {
      setPauseTime(Number(value));
      return;
    }

    // Uppdaterar state med det nya värdet från det ändrade fältet
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  
  return (
    // Formulär för att logga arbetspass-aktiviteter
    <form
    className={styles.modalForm}
    onSubmit={(e) => {
      e.preventDefault();
      handleSubmit(formData);
    }}
  >
    {/* Fält för att ange sessionens tider */}
      <label htmlFor="startedAt">Starttid</label>
      <input 
        type="datetime-local" 
        name="startedAt" 
        id="startedAt" 
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

      <label htmlFor="endedAt">Stopptid</label>
      <input
        type="datetime-local"
        name="endedAt"
        id="endedAt"
        value={formData.endedAt}
        onChange={handleChange}
      />
      <p id="activeTime">{calculateActiveTime(pauseTime)}</p>

      <label htmlFor="pause" >Paus (minuter)</label>  
      <input 
        type="number" 
        name="pause"
        id="pause"
        value={pauseTime}
        onChange={handleChange} 
        min={0}
        max={Math.floor((Date.parse(formData.endedAt) - Date.parse(formData.startedAt)) / 60000)}
        step={1}
      />

      {/* Input-fält för aktivitetens titel */}
      <label htmlFor="title">Aktivitet</label>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Vad har du jobbat med?"
        value={formData.title}
        onChange={handleChange}
      />
      {/* Dropdown för att välja aktivitetens kategori */}
      <label htmlFor="category">Kategori</label>
      <select
        name="category"
        id="category"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="">Välj Kategori</option>
        <option value="Arbete">Arbete</option>
        <option value="Studier">Studier</option>
        <option value="Möte">Möte</option>
      </select>

      <label htmlFor="comment">Kommentar</label>
      <textarea
        name="comment"
        id="comment"
        value={formData.comment}
        onChange={handleChange}
        placeholder="Skriv en kommentar"
      />
      <MoodPicker
        value={formData.mood}
        onChange={(newMood: Mood) => {
          setFormData((prev) => ({ ...prev, mood: newMood }))
        }}
      ></MoodPicker>
      <Button type="submit" text="Logga" onClick={() => {}}/>
    </form>
  );
}