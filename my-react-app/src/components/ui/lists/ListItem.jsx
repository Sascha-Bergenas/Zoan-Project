import styles from "./List.module.css"

export default function ListItem({session, evenOdd}) {
    const {started_at, title, category, ended_at, active_time_ms, comment, mood} = session
    const date = started_at.slice(0, 10) 
    const startTime = started_at.slice(11, 19)
    const stopTime = ended_at.slice(11, 19)
    const zoanTime = active_time_ms 
    const pauseTime = startTime - startTime - zoanTime

    return(
        <li className={`${styles.listItem} ${evenOdd === "even" ? styles.even : styles.odd}`}>
            <span>{date}</span>
            <span className={styles.cutLine}>{title}</span>
            <span>{category}</span>
            <span>{startTime}</span>
            <span>{stopTime}</span>
            <span>{zoanTime}</span>
            <span>{pauseTime}</span>
            <span className={styles.cutLine}>{comment}</span>
            <span className={styles.lastCol}>{mood}</span>
        </li>
    )
}
