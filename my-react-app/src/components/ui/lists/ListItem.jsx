import styles from "./List.module.css"

export default function ListItem({session, evenOdd}) {
    const {started_at, title, category, ended_at, active_time_ms, comment, mood} = session
    const startDate = new Date(started_at)
    const stopDate = new Date(ended_at)
    const date = started_at.slice(0, 10) 
    const startTime = startDate.getHours().toString().padStart(2, "0") + ":" + startDate.getMinutes().toString().padStart(2, "0")
    const stopTime = stopDate.getHours().toString().padStart(2, "0") + ":" + stopDate.getMinutes().toString().padStart(2, "0")
    const zoanTime = new Date(active_time_ms).toISOString().slice(11, 16) 

    return(
        <li className={`${styles.listItem} ${evenOdd === "even" ? styles.even : styles.odd}`}>
            <span>{date}</span>
            <span className={styles.cutLine}>{title}</span>
            <span>{category}</span>
            <span>{startTime}</span>
            <span>{stopTime}</span>
            <span>{zoanTime}</span>
            <span className={styles.cutLine}>{comment}</span>
            <span className={styles.lastCol}>{mood}</span>
        </li>
    )
}
