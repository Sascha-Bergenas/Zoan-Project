import ListHeader from "./ListHeader"
import ListItem from "./ListItem"


function List({sessions = []}) {
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
    return(
        <ul>
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