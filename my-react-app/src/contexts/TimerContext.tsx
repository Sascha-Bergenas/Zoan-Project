import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useState,
  } from "react";
  
  type TimerStatus = "idle" | "running" | "paused";
  type TimerMode = "deep" | "meeting" | "chill" | null;
  
  type TimerState = {
    status: TimerStatus;
    mode:TimerMode;
      accumulatedMs: number;
      startedAtMs: number | null;
      firstStartedAtMs: number | null;
  };
  
  type TimerAction =
    | { type: "START" }
    | { type: "PAUSE" }
    | { type: "STOP" }
    | { type: "SET_MODE"; mode: TimerState["mode"] }
    | { type: "CLEAR_MODE" };
  
  const initialState: TimerState = {
    status: "idle",
    mode: null,
    accumulatedMs: 0,
    startedAtMs: null,
    firstStartedAtMs: null,
  };
  
  function timerReducer(state: TimerState, action: TimerAction): TimerState {
    switch (action.type) {
      case "START": {
        if (state.status === "running") return state;
        if (state.mode == null) return state; 
  
        const now = Date.now();
  
        return {
          ...state,
          status: "running",
          firstStartedAtMs: state.firstStartedAtMs ?? now,
          startedAtMs: now,
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
  
    // actions
    startTimer: () => void;
    pauseTimer: () => void;
    stopTimer: () => void;
    setMode: (mode: TimerMode) => void;
    clearMode: () => void;

    state: TimerState;
  };
  
  const TimerContext = createContext<TimerContextValue | undefined>(undefined);
  
  export function TimerProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(timerReducer, initialState);
  
    const [now, setNow] = useState<number>(() => Date.now());
  
    useEffect(() => {
      if (state.status !== "running") return;
  
      const id = window.setInterval(() => setNow(Date.now()), 100); 
      return () => window.clearInterval(id);
    }, [state.status]);
  
    const time = useMemo(() => {
      void now;
      return getElapsedMs(state);
    }, [state, now]);
  
    const value: TimerContextValue = {
      state,
      time,
      now,
  
      getStartedTime: () => state.firstStartedAtMs,
  
      startTimer: () => dispatch({ type: "START" }),
      pauseTimer: () => dispatch({ type: "PAUSE" }),
      stopTimer: () => dispatch({ type: "STOP" }),
      setMode: (mode) => dispatch({ type: "SET_MODE", mode }),
      clearMode: () => dispatch({ type: "CLEAR_MODE" }),
    };
  
    return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
  }
  
  export function useTimer() {
    const ctx = useContext(TimerContext);
    if (!ctx) throw new Error("useTimer must be used inside <TimerProvider />");
    return ctx;
  }
  