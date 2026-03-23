import styles from "./List.module.css"

export default function ListHeader({headers}) {
    return(
        <li className={`${styles.listItem} ${styles.listHeader}`}>
            <span>{headers[0]}</span>
            <span>{headers[1]}</span>
            <span>{headers[2]}</span>
            <span className={styles.canhide}>{headers[3]}</span>
            <span className={styles.canhide}>{headers[4]}</span>
            <span>{headers[5]}</span>
            <span className={styles.canhide}>{headers[6]}</span>
            <span className={styles.canhide}>{headers[7]}</span>
        </li>
        // <li className={`${styles.listItem} ${styles.listHeader}`}>{
        //     headers.map((k, i) => {
        //         const isLast = i === headers.length - 1
        //         return(
        //             <span 
        //                 key={`${k}-${i}`} 
        //                 className={ isLast ? styles.lastCol : undefined}>
        //                 {k}
        //             </span> 
        //         )
        //     })
        // }</li>
    )
}