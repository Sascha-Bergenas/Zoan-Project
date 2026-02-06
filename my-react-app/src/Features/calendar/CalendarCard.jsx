import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import svLocale from "@fullcalendar/core/locales/sv";
import "./CalendarCard.css";
import { useEffect, useState, useMemo } from "react";
import { sessionStore } from "../../storage/localStorage";
import "../mood/mood.css";

function CalendarCard() {
  // Sessions från localStorage lagras i sessions
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // Hämtar sessions från localStorage och sparar i state
    const loadSessions = () => {
      setSessions(sessionStore.load());
    };

    loadSessions();

    // Lyssnar på egen event när localStorage ändras
    const handleLocalChange = (event) => {
      // Ignorera om det inte gäller våra sessions
      if (event?.detail?.key !== "localsessions") return;
      loadSessions();
    };

    window.addEventListener("localstore:change", handleLocalChange);
    // Städar upp event-lyssnaren när komponenten tas bort
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

  // Skapar ett event per dag (dominerande mood för dagen vinner)
  const events = useMemo(() => {
    // Samlar statistik per datum så att vi kan räkna dominerande mood
    const statsByDate = {};

    sessions.forEach((session) => {
      // Använder slutdatum först, annars skapad tid
      const rawDate =
        session?.endedAt ?? session?.ended_at ?? session?.createdAt;
      if (!rawDate) return;

      const date = new Date(rawDate);
      // Avbryt om datumet är ogiltigt
      if (Number.isNaN(date.getTime())) return;

      // Exakt kalenderdag i formatet YYYY-MM-DD, timmar mm räknas inte med
      const dateKey = date.toISOString().split("T")[0];
      const mood = session?.mood ?? "unknown";

      // Skapa datum-nyckel om den saknas
      if (!statsByDate[dateKey]) {
        statsByDate[dateKey] = { counts: {}, latestByMood: {} };
      }

      // Räkna hur många gånger varje mood förekommer
      const stats = statsByDate[dateKey];
      stats.counts[mood] = (stats.counts[mood] || 0) + 1;

      // Spara senaste tiden för varje mood
      stats.latestByMood[mood] = Math.max(
        stats.latestByMood[mood] || 0,
        date.getTime()
      );
    });

    // Välj dominant mood (flest förekomster, tiebreak = senaste mood)
    return Object.entries(statsByDate).map(([dateKey, stats]) => {
      let dominantMood = "unknown";
      let maxCount = -1;
      let latestTs = -1;

      Object.entries(stats.counts).forEach(([mood, count]) => {
        const moodLatest = stats.latestByMood[mood] || 0;

        // Tiebreak: senaste mood vinner
        if (count > maxCount || (count === maxCount && moodLatest > latestTs)) {
          dominantMood = mood;
          maxCount = count;
          latestTs = moodLatest;
        }
      });

      // Bygg FullCalendar-eventet för dagen (färg styrs av mood-klass)
      return {
        id: `${dateKey}-${dominantMood}`,
        title: "",
        start: dateKey,
        className: moodClassByLabel[dominantMood] || "mood-unknown"
      };
    });
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
