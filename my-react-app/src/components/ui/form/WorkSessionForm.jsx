import { useState } from "react";
import Button from "../Button";
import Input from "../input";
import Select from "../select/Select";
import TextArea from "../textArea/TextArea";

function WorkSessionForm() {
  // State för att lagra arbetspassets information (titel, kategori, kommentar)
  const [workSession, setWorkSession] = useState({
    title: "",
    category: "",
    comment: "",
  });

  // Hanterar ändringar i input-fält genom att uppdatera state
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Uppdaterar state med det nya värdet från det ändrade fältet
    setWorkSession((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Hanterar formulärskickning - rensar formulär och state
  const handleSubmit = (e) => {
    e.preventDefault();

    // Nollställer state
    setWorkSession({ title: "", category: "", comment: "" });

    console.log("Arbetspass:", workSession);

    // Nollställer formulärets HTML-element
    e.target.reset();
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
        <option value="Annat">Annat</option>
        <option value="Chill-i-Dill">Chill-i-Dill</option>
      </Select>

      <TextArea
        label="Kommentar"
        name="comment"
        value={workSession.comment}
        onChange={handleChange}
        placeholder="Skriv en kommentar"
      />
      <Button type="submit" text="Logga" />
    </form>
  );
}
export default WorkSessionForm;
