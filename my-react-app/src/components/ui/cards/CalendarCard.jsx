import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styles from "./CalendarCard.module.css";

function CalendarCard() {
  return (
    <div className={styles.calendarWrapper}>
      <div className={styles.miniCalendar}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          height="auto"
          headerToolbar={{
            left: "prev",
            center: "title",
            right: "next",
          }}
        />
      </div>
    </div>
  );
}

export default CalendarCard;
