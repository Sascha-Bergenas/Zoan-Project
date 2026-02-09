import "./mood.css";
import { MdMood, MdMoodBad } from "react-icons/md";
import {
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
      label: "happy",
      emoji: TbMoodHappyFilled,
      color: "green",
    },
    {
      id: 2,
      label: "fine",
      emoji: TbMoodSmileFilled,
      color: "dark-green",
    },
    {
      id: 3,
      label: "meh",
      emoji: TbMoodEmptyFilled,
      color: "orange",
    },
    {
      id: 4,
      label: "bad",
      emoji: TbMoodSadFilled,
      color: "blue",
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
