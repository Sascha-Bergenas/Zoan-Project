import Button from "./components/ui/Button";
import Card from "./components/ui/Card";

export default function App() {
  return (
    <>
      <div>
        <Button text="Test Secondary" variant="secondary" />
        <Button text="Primary Enabled" type="button" />
        <Button
          text="Secondary Disabled"
          type="button"
          variant="secondary"
          disabled={true}
        />
      </div>
      <div>
        <Card
          title="Card test"
          description={`Lorem ipsum dolor, sit amet consectetur adipisicing elit.
Magnam, est.`}
        >
          <div>
            <Button text="Click here" />
            <p>Children children</p>
          </div>
        </Card>
      </div>
    </>
  );
}
