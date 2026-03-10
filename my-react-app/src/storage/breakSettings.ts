export type BreakSettings = {
    deepMin: number;
    meetingMin: number;
    chillMin: number | null;
    beerOnFriday: boolean,
  };
  
  export const DEFAULT_BREAK_SETTINGS: BreakSettings = {
    deepMin: 45,
    meetingMin: 60,
    chillMin: null,
    beerOnFriday: false,
  };
