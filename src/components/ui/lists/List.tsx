import useSessions from "../../../contexts/sessions/useSessions"
import ListHeader from "./ListHeader"
import ListItem from "./ListItem"
import styles from "./List.module.css" 
import { useState, useRef, useEffect } from "react"
import EditSessionModal from "../../../Features/modals/editSessionModal/editSessionModal"


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
    const { sessions, status } = useSessions()
    console.log(status);
    const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
    const editDialogRef = useRef<HTMLDialogElement | null>(null);

        const handleEditClick = (sessionId: string) => {
        setEditingSessionId(sessionId);
        editDialogRef.current?.showModal();
        };

        useEffect(() => {
            if (editingSessionId) {
              editDialogRef.current?.showModal();
            }
          }, [editingSessionId]);
    return(

        <>
              {editingSessionId && (
        <EditSessionModal
          mode="edit"
          sessionId={editingSessionId}
          dialogRef={editDialogRef}
        />
      )}
            <ul className={styles.list}>
                {status.type === "isLoading" ? 
                    <p className="loading">Loading...</p> :
                    <ListHeader headers={headers} />
                }
                {  
                    sessions.map((session, i) => {
                        return <ListItem 
                            session={session} 
                            key={session.session_id} 
                            evenOdd={i % 2 > 0 ? "odd" : "even"} 
                            onEdit={handleEditClick}
                        />
                    })
                }
            </ul>
        </>
    )
}

export default List