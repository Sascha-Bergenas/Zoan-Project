import styles from "./List.module.css"

export default function ListItem({session, evenOdd}) {
    const {date, header, category, startTime, stopTime, zoanTime, pauseTime, comment, mood} = session
    return(
        <li className={`${styles.listItem} ${evenOdd === "even" ? styles.even : styles.odd}`}>
            <span>{date}</span>
            <span className={styles.cutLine}>{header}</span>
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
