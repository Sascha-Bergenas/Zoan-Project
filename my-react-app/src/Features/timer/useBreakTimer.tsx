import { useEffect, useState } from "react";
import { TimerStatus } from "../../contexts/TimerContext";

export function useBreakTimer({
  status,
  now,
  nextBreakAtMs,
}: {
  status: TimerStatus;
  now: number;
  nextBreakAtMs: number | null;
}) {
  const [isBreakTime, setIsBreakTime] = useState(false);

  useEffect(() => {
    if (status !== "running" || nextBreakAtMs == null) {
      setIsBreakTime(false);
      return;
    }
    setIsBreakTime(now >= nextBreakAtMs);
  }, [status, now, nextBreakAtMs]);

  return { isBreakTime };
}