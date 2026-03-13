export type BreakSettings = {
    deepMin: number;
    meetingMin: number;
    chillMin: number | null;
  };
  
  export const DEFAULT_BREAK_SETTINGS: BreakSettings = {
    deepMin: 45,
    meetingMin: 60,
    chillMin: null,
  };
