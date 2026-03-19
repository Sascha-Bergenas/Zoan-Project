export function calcTime(ms) {
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  //   const seconds = Math.floor((ms % 60000) / 1000);

  //   return {
  //     formattedHours: hours.toString().padStart(2, "0"),
  //     formattedMinutes: minutes.toString().padStart(2, "0"),
  //     formattedSeconds: seconds.toString().padStart(2, "0"),
  //   };

  return {
    formattedHours: hours,
    formattedMinutes: minutes,
  };
}
