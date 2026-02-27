import { BreakSettings } from "./breakSettings";
import { DEFAULT_BREAK_SETTINGS } from "./breakSettings";

const KEY = "breakSettings";

export function loadBreakSettings(): BreakSettings {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT_BREAK_SETTINGS;

    const parsed = JSON.parse(raw);

    // ai fallback
    if (!parsed || typeof parsed !== "object") return DEFAULT_BREAK_SETTINGS;

    return {
      deepMin: typeof parsed.deepMin === "number" ? parsed.deepMin : DEFAULT_BREAK_SETTINGS.deepMin,
      meetingMin: typeof parsed.meetingMin === "number" ? parsed.meetingMin : DEFAULT_BREAK_SETTINGS.meetingMin,
      chillMin:
        parsed.chillMin === null || typeof parsed.chillMin === "number"
          ? parsed.chillMin
          : DEFAULT_BREAK_SETTINGS.chillMin,
      beerOnFriday: typeof parsed.beerOnFriday === 'boolean' ? parsed.beerOnFriday : DEFAULT_BREAK_SETTINGS.beerOnFriday,
    };
  } catch {
    return DEFAULT_BREAK_SETTINGS;
  }
}
export function saveBreakSettings(value: BreakSettings) {
    localStorage.setItem(KEY, JSON.stringify(value));
  }