import styles from "./List.module.css"
import useSessions from "../../../contexts/sessions/useSessions";

export default function ListItem({session, evenOdd, onEdit}) {
    const {started_at, title, category, ended_at, comment, mood, active_time_ms} = session;
    const { actions } = useSessions();

    const startDate = new Date(started_at)
    const stopDate = new Date(ended_at)
  
    const date = startDate.toLocaleDateString("sv-SE")
  
    const startTime =
      startDate.getHours().toString().padStart(2, "0") +
      ":" +
      startDate.getMinutes().toString().padStart(2, "0")
  
    const stopTime =
      stopDate.getHours().toString().padStart(2, "0") +
      ":" +
      stopDate.getMinutes().toString().padStart(2, "0")
  
    const minutes = Math.floor(active_time_ms / 60000)
    const hours = Math.floor(minutes / 60)
    const remainingMinutes = minutes % 60
  
    const activeTime =
      hours.toString().padStart(2, "0") +
      ":" +
      remainingMinutes.toString().padStart(2, "0")

      const handleDelete = async () => {
        try {
          await actions.delete(session.session_id);
        } catch (err) {
          console.error(err);
        }
      };
  
    return (
      <li className={`${styles.listItem} ${evenOdd === "even" ? styles.even : styles.odd}`}>
        <span>{date}</span>
        <span className={styles.cutLine}>{title}</span>
        <span>{category}</span>
        <span>{startTime}</span>
        <span>{stopTime}</span>
        <span>{activeTime}</span>
        <span className={styles.cutLine}>{comment}</span>
        <span className={styles.lastCol}>{mood}</span>
        <div className={styles.buttonCont}>
            <button type="button" onClick={handleDelete}>✖️</button>
            <button type="button" onClick={() => onEdit(session.session_id)}>
                Ändra
            </button>
        </div>
      </li>
    )
  }