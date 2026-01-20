import Button from "../Button";
import Input from "../input";
import Select from "../select/Select";

function WorkSessionForm() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const workSession = {
      title: formData.get("title"),
      category: formData.get("category"),
      comment: formData.get("comment"),
    };

    console.log("Arbetspass:", workSession);

    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="text"
        label="Aktivitet"
        name="title"
        placeholder="Vad har du jobbat med?"
      />
      <Select label="Kategori" name="category">
        <option value="">Välj kategori</option>
        <option value="arbete">Arbete</option>
        <option value="studier">Studier</option>
        <option value="möte">Möte</option>
        <option value="annat">Annat</option>
      </Select>
      <Input
        className="input-comment"
        type="text"
        name="comment"
        placeholder="Skriv en kommentar"
      />
      <Button type="submit" text="Logga" />
    </form>
  );
}

export default WorkSessionForm;
