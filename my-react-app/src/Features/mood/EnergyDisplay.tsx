import {
    PiBatteryFullBold,
    PiBatteryLowBold,
    PiBatteryMediumBold,
    PiBatteryHighBold,
  } from "react-icons/pi";
import { IoBeerOutline } from "react-icons/io5";
import "./mood.css";
import { useTimer } from "../../contexts/TimerContext";

  type MoodBatteryProps = { avgMood: number | null };
  
  export function EnergyDisplay({ avgMood }: MoodBatteryProps) {
    const { breakSettings } = useTimer();
    if (avgMood == null) return <PiBatteryMediumBold size={72} color="white" />;

    if (avgMood >= 5.1 && breakSettings.beerOnFriday) {
      return (
        <IoBeerOutline size={72} className="legendary-pulse" color="gold" style={{ paddingTop: "2px" }} />
      );
    }
    if (avgMood < 1) return <PiBatteryLowBold size={72} color="white" />;
    if (avgMood < 2) return <PiBatteryMediumBold size={72} color="white" />;
    if (avgMood < 3) return <PiBatteryHighBold size={72} color="white" />;
    return <PiBatteryFullBold size={72} color="white" />;
  }