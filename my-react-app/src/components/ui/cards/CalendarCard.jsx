import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import svLocale from "@fullcalendar/core/locales/sv";
import "./CalendarCard.css";

function CalendarCard() {
  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      locale={svLocale}
      expandRows={false}
      showNonCurrentDates={true}
      fixedWeekCount={true}
      headerToolbar={{
        left: "prev,next",
        center: "title",
        right: "",
      }}
      height="auto"
    />
  );
}

export default CalendarCard;
