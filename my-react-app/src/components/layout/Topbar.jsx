import TopBarCard from "./TopBarCard";
import styles from "./Topbar.module.css";
import { calcTime } from "../../utils/formatTime";
import { useTimer } from "../../contexts/TimerContext";
import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../contexts/useAuth";
import { sessionStore } from "../../storage/localStorage";
import supabase from "../../supabase/supabase";
import { TbBatteryAutomotive } from "react-icons/tb";
import { EnergyDisplay } from "../../Features/mood/EnergyDisplay";
import Button from "../ui/button/Button";


export default function Topbar() {
  const {
    state,
    acknowledgeBreak,
    actions,
  } = useTimer();

  const [session, setSession] = useState(null);
  const { user, isAuthed } = useAuth();
  const [wallNow, setWallNow] = useState(() => Date.now());

  useEffect(() => {
      async function loadSession() {
      if (!isAuthed) {
        const local = sessionStore.load();
        console.log("loaded local session:", local);
         setSession(local ?? null);
        return;
      }
  
      const { data, error } = await supabase
        .from("sessions")
        .select("*")
        .eq('user_id', user?.id)
        .order("created_at", { ascending: false })
        .limit(4)
  
      if (error) {
        console.error("supabase sessions load error:", error);
        setSession(null);
        return;
      }
  
      console.log("loaded supabase session:", data);
        setSession(data ?? null);
    }
  
    loadSession();
  
  }, [isAuthed, user?.id]);

  const avgMood = useMemo(() => {
    if (!session?.length) return null;
  
    const valid = session.filter(s => typeof s.mood === "number");
    if (!valid.length) return null;

    const isFriday = new Date().getDay() === 5;
  
    const sum = valid.reduce((acc, s) => acc + s.mood, 0);
    const result = isFriday ? (sum / valid.length)+1 : (sum / valid.length)

    return result;
  }, [session]);

  const breakNow =
  state.status === "paused" && state.pausedAtMs != null
    ? state.pausedAtMs
    : wallNow;

  useEffect(() => {
    if (state.firstStartedAtMs == null) return;

    const id = setInterval(() => setWallNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [state.firstStartedAtMs]);

  const startedAt = state.firstStartedAtMs;
  const totalTimeMs = startedAt != null ? Math.max(0, wallNow - startedAt) : 0;
  const { formattedHours, formattedMinutes } = calcTime(totalTimeMs);

  // För att visa nästa rast korrekt
  const nextBreakAt = state.nextBreakAtMs;

  const DUE_EARLY_MS = 200;
  const isBreakDue =
  nextBreakAt != null && breakNow + DUE_EARLY_MS >= nextBreakAt;

  let displayBreak = "countdown";

    if (state.onBreak) displayBreak = "onBreak";
    else if (isBreakDue) displayBreak = "due";

    let timeLabel = "-";

if (displayBreak === "countdown" && nextBreakAt != null) {
  const msLeft = nextBreakAt - breakNow;

  timeLabel =
    msLeft > 60000
      ? `om ${Math.floor(msLeft / 60000)} min`
      : `om ${Math.ceil(msLeft / 1000)} sek`;
}

  // Display mode
  function formatMode(mode) {
    if (!mode) return "-";
  
    switch (mode) {
      case "deep":
        return "Deep Work";
      case "meeting":
        return "Meeting";
      case "chill":
        return "Chill";
    }
  }

  return (
    <aside className={styles.container}>
      <TopBarCard title="Total tid" className={styles.card1}>
        <p>
          {formattedHours}h {formattedMinutes}min
        </p>
      </TopBarCard>
      <TopBarCard title="Energiprognos" className={styles.card2}>
        <EnergyDisplay avgMood={avgMood} />
      </TopBarCard>
      <TopBarCard title="Nästa rast" className={styles.card3}>
{displayBreak === "due" ? (
  <div className="break-container">
    <p>Dags för rast!</p>
    <div className="break-actions">
      <button
        onClick={() => {
          acknowledgeBreak();
          actions.pause();
          actions.takeBreak();
        }}
      >
        Ta rast
      </button>

      <button
        onClick={() => {
          acknowledgeBreak();
        }}
      >
        Inte nu
      </button>
    </div>
  </div>
) : displayBreak === "onBreak" ? (
  <p>Nu</p>
) : (
  <p>{timeLabel}</p>
)}
      </TopBarCard>
      <TopBarCard title="Nuvarande mode" className={styles.card4}>
        <p>{formatMode(state.mode)}</p>
      </TopBarCard>
    </aside>
  );
}
