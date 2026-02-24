import {
    PiBatteryFullBold,
    PiBatteryLowBold,
    PiBatteryMediumBold,
    PiBatteryHighBold,
  } from "react-icons/pi";
import { IoBeerOutline } from "react-icons/io5";
import "./mood.css";

  type MoodBatteryProps = { avgMood: number };
  
  export function EnergyDisplay({ avgMood }: MoodBatteryProps) {
    if (avgMood >= 7) {
      return (
        <IoBeerOutline size={72} className="legendary-pulse" color="gold" style={{ paddingTop: "2px" }} />
      );
    }
    if (avgMood < 1) return <PiBatteryLowBold size={72} color="white" />;
    if (avgMood < 2) return <PiBatteryMediumBold size={72} color="white" />;
    if (avgMood < 3) return <PiBatteryHighBold size={72} color="white" />;
    return <PiBatteryFullBold size={72} color="white" />;
  }