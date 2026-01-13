import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import TimerDisplay from "./components/Features/timer/TimerDisplay";
import "./components/Features/timer/timer.css";
import "./App.css";
import MoodPicker from "./components/Features/mood/MoodPicker";
import Layout from "./components/layout/Layout";

export default function App() {
  return (
    <>  
      <div>
      <Layout>
      </Layout>
        <Button text="Test Secondary" variant="secondary" />
        <Button text="Primary Enabled" type="button" />
        <Button
          text="Secondary Disabled"
          type="button"
          variant="secondary"
          disabled={true}
        />
      </div>
      {/* ------TIMER-------- */}
      <h3>Timer</h3>
      <Card size="card-small">
        <TimerDisplay hours={1} seconds={90} ms={23} />
        <span>Paus: 00:13:55</span>
        <div className="timer-actions">
          <Button text="Start" />
          <Button text="Paus" type="button" variant="secondary" />
        </div>
      </Card>

      {/* -------- Mood ------- */}
      <h3>Dagens Mood</h3>
      <Card size="card-small">
        <MoodPicker />
      </Card>
    </>
  );
}