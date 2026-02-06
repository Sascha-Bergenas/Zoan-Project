import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import svLocale from "@fullcalendar/core/locales/sv";
import "./CalendarCard.css";
import { useEffect, useState, useMemo } from "react";
import { sessionStore } from "../../storage/localStorage";
import "../mood/mood.css";

function CalendarCard() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // Ladda sessioner initialt och vid lokala lagringsändringar
    const loadSessions = () => {
      setSessions(sessionStore.load());
    };

    loadSessions();

    const handleLocalChange = (event) => {
      if (event?.detail?.key !== "localsessions") return;
      loadSessions();
    };

    window.addEventListener("localstore:change", handleLocalChange);
    return () =>
      window.removeEventListener("localstore:change", handleLocalChange);
  }, []);

  // Mappar mood-värde till CSS-klass för färg
  const moodClassByLabel = {
    happy: "mood-green",
    fine: "mood-dark-green",
    meh: "mood-orange",
    bad: "mood-blue"
  };

  // Skapar FullCalendar-events utifrån sessioner, körs bara om data ändras
  const events = useMemo(() => {
    return sessions
      .map((session) => {
        const rawDate =
          session?.endedAt ?? session?.ended_at ?? session?.createdAt;
        if (!rawDate) return null;

        const date = new Date(rawDate);
        if (Number.isNaN(date.getTime())) return null;
        // Exakt kalenderdag i formatet YYYY-MM-DD, timmar mm räknas inte med
        const dateKey = date.toISOString().split("T")[0];

        // Event-objektet som blir en prick i kalendern
        return {
          id: session?.id ?? `$dateKey-${session?.mood ?? "unknown"}`,
          title: "",
          start: dateKey,
          className: moodClassByLabel[session?.mood] || "mood-unknown"
        };
      })
      .filter(Boolean);
  }, [sessions]);

  return (
    <FullCalendar
      height="auto"
      initialView="dayGridMonth"
      eventDisplay="block"
      plugins={[dayGridPlugin]}
      headerToolbar={{
        left: "prev,next",
        center: "title",
        right: ""
      }}
      locale={svLocale}
      events={events}
      dayMaxEvents={1}
      expandRows={true}
      showNonCurrentDates={true}
      displayEventTime={false}
      fixedWeekCount={true}
    />
  );
}

export default CalendarCard;
