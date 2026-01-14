import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import InfoCard from "./components/ui/InfoCard";

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
          title="Test Card"
          description={`Lorem ipsum dolor, sit amet consectetur adipisicing elit.
Magnam, est.`}
        >
          <div>
            <Button text="Click here" />
            <p>Children children</p>
          </div>
        </Card>
      </div>
      <InfoCard
        title="Smarta Rekommendationer"
        items={[
          { text: "Ta en paus om 20 min" },
          { text: "Möte kl. 11:00" },
          { text: "Fokusera på Deep Work nu" },
        ]}
      />
    </>
  );
}
