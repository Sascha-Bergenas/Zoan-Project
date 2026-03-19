import {
  BarDatum,
  CategoryKey,
  GraphData,
  PieDatum,
  Session
} from "./graph.types";

const MS_PER_MINUTE = 60_000;
const LAST_DAYS = 7;

// Säkerställer att mood är ett heltal mellan 1 och 5.
const normalizeMood = (rawMood: unknown) => {
  const numericMood = Number(rawMood);
  if (Number.isInteger(numericMood) && numericMood >= 1 && numericMood <= 5) {
    return numericMood;
  }

  return null;
};

// Normaliserar kategori till interna stapelnycklar.
const getCategoryKey = (rawCategory: unknown): CategoryKey | null => {
  const category = String(rawCategory ?? "")
    .trim()
    .toLowerCase();

  if (category === "arbete" || category === "work") return "work";
  if (category === "studier" || category === "study") return "study";
  if (category === "möte" || category === "mote" || category === "meeting") {
    return "meeting";
  }

  return null;
};

// Hämtar första giltiga datumfältet från en session.
const getSessionDate = (session: Session) => {
  const rawDate =
    session.ended_at ??
    session.endedAt ??
    session.started_at ??
    session.startedAt;
  const date = rawDate ? new Date(String(rawDate)) : null;

  if (!date || Number.isNaN(date.getTime())) return null;

  return date;
};

const getDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const formatDateLabel = (date: Date) =>
  date.toLocaleDateString("sv-SE", {
    day: "2-digit",
    month: "2-digit"
  });

// Bygger all data till båda graferna, filtrerat på senaste 7 dagarna för bars och dagens datum för pie.
export const buildGraphData = (sessions: Session[]): GraphData => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayKey = getDateKey(today);

  const oldestDate = new Date(today);
  oldestDate.setDate(today.getDate() - (LAST_DAYS - 1));

  const recentDates: Date[] = [];
  for (let offset = LAST_DAYS - 1; offset >= 0; offset -= 1) {
    const date = new Date(today);
    date.setDate(today.getDate() - offset);
    recentDates.push(date);
  }

  const dateIndexMap = new Map<string, number>(
    recentDates.map((date, index) => [getDateKey(date), index])
  );

  const moodCounts: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  };

  const barData: BarDatum[] = recentDates.map((date) => ({
    name: formatDateLabel(date),
    work: 0,
    study: 0,
    meeting: 0
  }));

  sessions.forEach((session) => {
    // Hoppa över sessioner äldre än senaste 7 dagarna (för stapeldiagrammet).
    const date = getSessionDate(session);
    if (!date || date.getTime() < oldestDate.getTime()) {
      return;
    }

    const sessionDateKey = getDateKey(date);
    const dayIndex = dateIndexMap.get(sessionDateKey);
    if (dayIndex == null) {
      return;
    }

    // Räkna bara mood från dagens sessioner för piecharten.
    const mood = normalizeMood(session.mood);
    if (mood && sessionDateKey === todayKey) {
      const currentMoodCount = moodCounts[mood];
      if (currentMoodCount !== undefined) {
        moodCounts[mood] = currentMoodCount + 1;
      }
    }

    const categoryKey = getCategoryKey(session.category);
    const activeTimeMs = Number(
      session.active_time_ms ?? session.activeTime ?? 0
    );

    if (!categoryKey || !Number.isFinite(activeTimeMs) || activeTimeMs <= 0) {
      return;
    }

    const durationMinutes = activeTimeMs / MS_PER_MINUTE;
    const currentBarDay = barData[dayIndex];
    if (!currentBarDay) {
      return;
    }

    currentBarDay[categoryKey] += durationMinutes;
  });

  const moodPieData: PieDatum[] = (
    Object.entries(moodCounts) as Array<[string, number]>
  )
    .filter(([, value]) => value > 0)
    .map(([mood, value]) => ({
      name: `Mood ${mood}`,
      value,
      mood: Number(mood)
    }));

  return {
    pieData: moodPieData.length
      ? moodPieData
      : [{ name: "No mood", value: 1, mood: 0 }],
    rangedStackedBarData: barData
  };
};
