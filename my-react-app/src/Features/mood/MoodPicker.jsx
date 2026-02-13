import "./mood.css";
import { MdMood, MdMoodBad } from "react-icons/md";
import {
  TbMoodWrrrFilled,
  TbMoodHappyFilled,
  TbMoodSmileFilled,
  TbMoodEmptyFilled,
  TbMoodSadFilled,
} from "react-icons/tb";
import { FaPlus } from "react-icons/fa";

export default function MoodPicker({
  moodOptions = [
    {
      id: 1,
      label: 5,
      emoji: TbMoodHappyFilled,
      color: "green",
    },
    {
      id: 2,
      label: 4,
      emoji: TbMoodSmileFilled,
      color: "dark-green",
    },
    {
      id: 3,
      label: 3,
      emoji: TbMoodEmptyFilled,
      color: "orange",
    },
    {
      id: 4,
      label: 2,
      emoji: TbMoodSadFilled,
      color: "blue",
    },
    {
      id: 5,
      label: 1,
      emoji: TbMoodWrrrFilled,
      color: "red",
    },
  ], value, onChange,
}) {
  return (
    <div className="mood-picker">
      <p>Hur känner du dig?</p>
      <div className="mood-options">
        <ul>
          {moodOptions.map((mood) => {

            const isActive = value === mood.label;

          return ( 
            <li key={mood.id} className={`mood-${mood.color} ${isActive ? "active" : ""}`} onClick={() => onChange(mood.label)}>
              <mood.emoji size={48} />
            </li>
          )})}
        </ul>
      </div>
    </div>
  );
}
