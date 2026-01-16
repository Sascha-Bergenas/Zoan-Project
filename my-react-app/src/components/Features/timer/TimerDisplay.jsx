export default function TimerDisplay({ seconds, hours, ms }) {
  return (
    <p>
      0{hours}:{seconds}:{ms}
    </p>
  );
}
