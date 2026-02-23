import {
    PiBatteryFullBold,
    PiBatteryLowBold,
    PiBatteryMediumBold,
    PiBatteryHighBold,
  } from "react-icons/pi";
import { IoBeerOutline } from "react-icons/io5";
  
  type MoodBatteryProps = { avgMood: number };
  
  export function EnergyDisplay({ avgMood }: MoodBatteryProps) {
    if (avgMood >= 2) {
      return (
        <IoBeerOutline size={72} color="white" style={{ paddingTop: "2px" }} />
      );
    }
    if (avgMood < 1) return <PiBatteryLowBold size={72} color="white" />;
    if (avgMood < 2) return <PiBatteryMediumBold size={72} color="white" />;
    if (avgMood < 3) return <PiBatteryHighBold size={72} color="white" />;
    return <PiBatteryFullBold size={72} color="white" />;
  }