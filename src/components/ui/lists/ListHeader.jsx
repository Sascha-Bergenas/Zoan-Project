import styles from "./List.module.css"

export default function ListHeader({headers}) {
    return(

        <li className={`${styles.listItem} ${styles.listHeader}`}>{
            headers.map((k, i) => {
                const isLast = i === headers.length - 1
                const isHidable = k === "Start" || k === "Stopp" || k === "Kommentar" || k === "Mood"
                return(
                    <span 
                        key={`${k}-${i}`} 
                        className={ `${isLast ? styles.lastCol : undefined} ${isHidable ? styles.canhide : undefined}`}>
                        {k}
                    </span> 
                )
            })
        }</li>
    )
}