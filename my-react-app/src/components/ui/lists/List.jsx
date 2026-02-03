import ListItem from "./ListItem"

function List({sessions = []}) {
    return(
        <ul>
            {  
                sessions.map(e => {
                    return <ListItem session={e}/>
                })
            }
        </ul>
    )
}

export default List