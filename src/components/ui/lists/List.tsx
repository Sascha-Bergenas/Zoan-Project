import useSessions from "../../../contexts/sessions/useSessions"
import ListHeader from "./ListHeader"
import ListItem from "./ListItem"
import styles from "./List.module.css" 


// function List({sessions = []}) {
function List() {
    const headers = [
        "Datum",
        "Aktivitet",
        "Kategori",
        "Start",
        "Stopp",
        "Aktiv tid",
        "Kommentar",
        "Mood"
    ]
    const { sessions, status, actions } = useSessions()

    console.log(status);

    return(
        <ul className={styles.list}>
            <ListHeader headers={headers} />
            {  
                sessions.map((session, i) => {
                    return <ListItem 
                        session={session} 
                        key={i} 
                        evenOdd={i % 2 > 0 ? "odd" : "even"} 
                    />
                })
            }
        </ul>
    )
}

export default List