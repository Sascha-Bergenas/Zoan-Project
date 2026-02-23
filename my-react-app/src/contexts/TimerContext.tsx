import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useState,
  } from "react";
  import { useBreakTimer } from "../Features/timer/useBreakTimer";
  import { BreakSettings } from "../storage/breakSettings";
  import { loadBreakSettings, saveBreakSettings } from "../storage/breakSettingStorage";

  
  export type TimerStatus = "idle" | "running" | "paused";
  type TimerMode = "deep" | "meeting" | "chill" | null;
  type TimerActions = {
    start: () => void;
    pause: () => void;
    stop: () => void; 
    clearMode: () => void;
    setBreakEvery: (ms: number | null) => void;  
    selectMode: (mode: "deep" | "meeting" | "chill") => void;
  }
  
  type TimerState = {
    status: TimerStatus;
    mode:TimerMode;
      accumulatedMs: number;
      startedAtMs: number | null;
      firstStartedAtMs: number | null;

      nextBreakAtMs: number | null;
      breakEveryMs: number | null;

      pausedAtMs: number | null; 

  };
  
  type TimerAction =
    | { type: "START" }
    | { type: "PAUSE" }
    | { type: "STOP" }
    | { type: "SET_MODE"; mode: TimerState["mode"] }
    | { type: "CLEAR_MODE" }
    | { type: "SET_BREAK_EVERY"; ms: number | null }
    | { type: "ACK_BREAK" };
    
  
  const initialState: TimerState = {
    status: "idle",
    mode: null,
    accumulatedMs: 0,
    startedAtMs: null,
    firstStartedAtMs: null,
    nextBreakAtMs: null,
    breakEveryMs: null,
    pausedAtMs: null,
  };
  
  function timerReducer(state: TimerState, action: TimerAction): TimerState {
    switch (action.type) {
      case "START": {
        if (state.status === "running") return state;
        if (state.mode == null) return state; 
  
        const now = Date.now();

        const pausedDurationMs =
        state.status === "paused" && state.pausedAtMs != null
          ? now - state.pausedAtMs
          : 0;
    
      const nextBreakAtMs =
        state.nextBreakAtMs == null
          ? (state.breakEveryMs != null ? now + state.breakEveryMs : null)
          : state.nextBreakAtMs + pausedDurationMs;
    
      return {
        ...state,
        status: "running",
        firstStartedAtMs: state.firstStartedAtMs ?? now,
        startedAtMs: now,
        nextBreakAtMs,
        pausedAtMs: null,
      };
    }
  
      case "PAUSE": {
        if (state.status !== "running" || state.startedAtMs == null) return state;

        const now = Date.now();
        const lastElapsed = now - state.startedAtMs;
  
        return {
          ...state,
          status: "paused",
          accumulatedMs: state.accumulatedMs + lastElapsed,
          startedAtMs: null,
          pausedAtMs: now,
        };
      }
  
      case "STOP":
        return initialState;

      case "SET_MODE": {
        if (state.status !== "idle" || state.firstStartedAtMs != null) return state;
        return { ...state, mode: action.mode };
      }
      case "CLEAR_MODE": {
        if (state.status !== "idle" || state.firstStartedAtMs != null) return state;
        return { ...state, mode: null };
      }
      case "SET_BREAK_EVERY": {
        return { ...state, breakEveryMs: action.ms };
      }
      case "ACK_BREAK": {
        const now = Date.now();
        if (state.breakEveryMs == null) {
          return { ...state, nextBreakAtMs: null };
        }
        return {
          ...state,
          nextBreakAtMs: now + state.breakEveryMs,
        };
      }
      default: return state;
    }
  }
  
  function getElapsedMs(state: TimerState): number {
    if (state.status === "running" && state.startedAtMs != null) {
      return state.accumulatedMs + (Date.now() - state.startedAtMs);
    }
    return state.accumulatedMs;
  }

  type TimerContextValue = {
    time: number;
    now: number;
    getStartedTime: () => number | null;

    actions: TimerActions;
    state: TimerState;

    isBreakTime: boolean,
    acknowledgeBreak: () => void,

    breakSettings: BreakSettings;
    setBreakSettings: React.Dispatch<React.SetStateAction<BreakSettings>>;
  };
  
  const TimerContext = createContext<TimerContextValue | undefined>(undefined);
  
  export function TimerProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(timerReducer, initialState);
    const [now, setNow] = useState<number>(() => Date.now());
    const [breakSettings, setBreakSettings] = useState<BreakSettings>(() => loadBreakSettings());

    useEffect(() => {
      saveBreakSettings(breakSettings);
    }, [breakSettings]);


    const { isBreakTime } = useBreakTimer({
      status: state.status,
      now,
      nextBreakAtMs: state.nextBreakAtMs,
    });

    function breakMsForMode(mode: "deep" | "meeting" | "chill", s: BreakSettings) {
      const min =
        mode === "deep" ? s.deepMin :
        mode === "meeting" ? s.meetingMin :
        s.chillMin;
    
      return min == null ? null : min * 60_000;
    }

    const acknowledgeBreak = () => dispatch({ type: "ACK_BREAK" });

    const actions: TimerActions = {
      start: () => dispatch({ type: "START" }),
      pause: () => dispatch({ type: "PAUSE" }),
      stop: () => dispatch({ type: "STOP" }),
      
      selectMode: (mode) => {
        dispatch({ type: "SET_MODE", mode });
        dispatch({
          type: "SET_BREAK_EVERY",
          ms: breakMsForMode(mode, breakSettings),
        });
      },

      clearMode: () => dispatch({ type: "CLEAR_MODE" }),
      setBreakEvery: (ms) => dispatch({ type: "SET_BREAK_EVERY", ms }),    
    }

    useEffect(() => {
      if (state.status !== "running") return;
  
      const id = window.setInterval(() => setNow(Date.now()), 100); 
      return () => window.clearInterval(id);
    }, [state.status]);
  
    const time = useMemo(() => getElapsedMs(state), [state, now]);
  
    const value: TimerContextValue = {
      state,
      time,
      now,
      actions,
      getStartedTime: () => state.firstStartedAtMs,

      isBreakTime,
      acknowledgeBreak,

      breakSettings,       
      setBreakSettings, 
    };
    return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
  }
  
  export function useTimer() {
    const ctx = useContext(TimerContext);
    if (!ctx) throw new Error("useTimer must be used inside <TimerProvider />");
    return ctx;
  }
  