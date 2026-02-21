import ListHeader from "./ListHeader"
import ListItem from "./ListItem"


function List({sessions = [], handleEditClick}) {
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
                    evenOdd={session.id % 2 > 0 ? "odd" : "even"} 
                    onSelect={() => {
                        console.log(session);
                        handleEditClick(session)
                    }}/>
                })
            }
        </ul>
    )
}

export default List