import Button from "./components/ui/Button";

export default function App() {
  return (
    <>
      <Button text="Test Secondary" variant="secondary" />
      <Button text="Primary Enabled" type="button" />
      <Button
        text="Primary Disabled"
        type="button"
        variant="secondary"
        disabled={true}
      />
    </>
  );
}
