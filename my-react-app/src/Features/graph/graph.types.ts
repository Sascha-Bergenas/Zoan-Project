// Tillåtna nycklar för kategoristaplar i diagrammet.
export type CategoryKey = "work" | "study" | "meeting";

// Rå session som kan komma från olika källor/format.
// Fälten är unknown för att tvinga validering/parsing i helpers.
export type Session = {
  mood?: unknown;
  category?: unknown;
  active_time_ms?: unknown;
  activeTime?: unknown;
  ended_at?: unknown;
  endedAt?: unknown;
  started_at?: unknown;
  startedAt?: unknown;
};

// Datapunkt för pajdiagrammet
export type PieDatum = {
  name: string;
  value: number;
  mood: number;
};

// Datapunkt för stapeldiagrammet
export type BarDatum = {
  name: string;
  work: number;
  study: number;
  meeting: number;
};

// Samlat resultat som skickas till grafkomponenten.
export type GraphData = {
  pieData: PieDatum[];
  rangedStackedBarData: BarDatum[];
};
