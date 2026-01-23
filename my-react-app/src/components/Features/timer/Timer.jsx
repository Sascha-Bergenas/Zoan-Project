import useTimerLogic from "./timerLogic";

export default function Timer() {
  const { time, startTimer, pauseTimer, stopTimer } = useTimerLogic();

  function calcTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    return formattedMinutes + ":" + formattedSeconds;
  }

  return (
    <>
      <p>{calcTime(time)}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={pauseTimer}>Pause</button>
      <button onClick={stopTimer}>Stop</button>
    </>
  );
}
