import styles from "./listItem.module.css"

function ListItem({session}) {
    const {date, header, category, startTime, stopTime, zoanTime, pauseTime, comment, mood} = session
    return(
        <li className={styles.listItem}>
            
            <span>{date}</span>
            <span>{header}</span>
            <span>{category}</span>
            <span>{startTime}</span>
            <span>{stopTime}</span>
            <span>{zoanTime}</span>
            <span>{pauseTime}</span>
            <span>{comment}</span>
            <span>{mood}</span>
        </li>
    )
}

export default ListItem