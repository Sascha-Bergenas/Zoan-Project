import {
  BarDatum,
  CategoryKey,
  GraphData,
  PieDatum,
  Session
} from "./graph.types";

const WEEK_DAYS = ["Mån", "Tis", "Ons", "Tors", "Fre", "Lör", "Sön"] as const;
const MS_PER_MINUTE = 60_000;
const MS_PER_DAY = 24 * 60 * 60 * 1000;
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

// Bygger all data till båda graferna, filtrerat på senaste 7 dagar.
export const buildGraphData = (sessions: Session[]): GraphData => {
  const sevenDaysAgo = Date.now() - LAST_DAYS * MS_PER_DAY;

  const moodCounts: Record<number, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  };

  const barData: BarDatum[] = WEEK_DAYS.map((name) => ({
    name,
    work: 0,
    study: 0,
    meeting: 0
  }));

  sessions.forEach((session) => {
    // Hoppa över sessioner utanför tidsfönstret.
    const date = getSessionDate(session);
    if (!date || date.getTime() < sevenDaysAgo) {
      return;
    }

    const mood = normalizeMood(session.mood);
    if (mood) {
      moodCounts[mood] += 1;
    }

    const categoryKey = getCategoryKey(session.category);
    const activeTimeMs = Number(
      session.active_time_ms ?? session.activeTime ?? 0
    );

    if (!categoryKey || !Number.isFinite(activeTimeMs) || activeTimeMs <= 0) {
      return;
    }

    const dayIndex = (date.getDay() + 6) % 7;
    const durationMinutes = activeTimeMs / MS_PER_MINUTE;

    barData[dayIndex][categoryKey] += durationMinutes;
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
