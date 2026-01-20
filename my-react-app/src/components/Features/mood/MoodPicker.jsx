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
  ],
}) {
  return (
    <div className="mood-picker">
      <div className="mood-options">
        <ul>
          {moodOptions.map((mood) => (
            <li key={mood.id} className={`mood-${mood.color}`}>
              <mood.emoji size={52} />
            </li>
          ))}
        </ul>
        <div>
          <p>Lägg till en kommentar</p>
          <button className="btn-plus" type="button">
            <FaPlus size={28} />
          </button>
        </div>
      </div>
    </div>
  );
}
