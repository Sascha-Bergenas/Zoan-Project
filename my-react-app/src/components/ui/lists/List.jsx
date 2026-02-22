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
                    evenOdd={i % 2 > 0 ? "odd" : "even"} 
                    onSelect={() => {
                        // console.log(session);

                        // TO DO: Skicka bara upp session.id till HistoryPage, så fyller den i resten själv?
                        // Analys och test: Måste man ner i ListItem och vända för att kunna plocka upp rätt target för klicket?
                        // Kan man i List hitta id-strängen för det ListItem som klickas på?
                        
                        handleEditClick(session) 
                    }}/>
                })
            }
        </ul>
    )
}

export default List