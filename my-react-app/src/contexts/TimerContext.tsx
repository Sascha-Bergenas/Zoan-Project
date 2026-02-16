import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    useState,
  } from "react";
  
  type TimerStatus = "idle" | "running" | "paused";
  
  type TimerState = {
    status: TimerStatus;
      accumulatedMs: number;
      startedAtMs: number | null;
      firstStartedAtMs: number | null;
  };
  
  type TimerAction =
    | { type: "START" }
    | { type: "PAUSE" }
    | { type: "STOP" };
  
  const initialState: TimerState = {
    status: "idle",
    accumulatedMs: 0,
    startedAtMs: null,
    firstStartedAtMs: null,
  };
  
  function timerReducer(state: TimerState, action: TimerAction): TimerState {
    switch (action.type) {
      case "START": {
        if (state.status === "running") return state;
  
        const now = Date.now();
  
        return {
          ...state,
          status: "running",
          firstStartedAtMs: state.firstStartedAtMs,
          startedAtMs: now,
        };
      }
  
      case "PAUSE": {
        if (state.status !== "running" || state.startedAtMs == null) {
          return { ...state, status: "paused", startedAtMs: null };
        }
  
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
    isRunning: boolean;
    hasStarted: boolean;
    getStartedTime: () => number | null;
  
    // actions
    startTimer: () => void;
    pauseTimer: () => void;
    stopTimer: () => void;
  
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
  
      isRunning: state.status === "running",
      hasStarted: state.firstStartedAtMs != null,
  
      getStartedTime: () => state.firstStartedAtMs,
  
      startTimer: () => dispatch({ type: "START" }),
      pauseTimer: () => dispatch({ type: "PAUSE" }),
      stopTimer: () => dispatch({ type: "STOP" }),
    };
  
    return <TimerContext.Provider value={value}>{children}</TimerContext.Provider>;
  }
  
  export function useTimer() {
    const ctx = useContext(TimerContext);
    if (!ctx) throw new Error("useTimer must be used inside <TimerProvider />");
    return ctx;
  }
  