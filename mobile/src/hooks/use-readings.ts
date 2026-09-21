import { useEffect, useState } from "react";

import { fetchReadings, type Readings } from "../api";

export const POLL_INTERVAL_MS = 2000;

type ReadingsState = {
  readings: Readings | null;
  updatedAt: number | null;
  error: string | null;
};

const EMPTY: ReadingsState = { readings: null, updatedAt: null, error: null };

export function useReadings(host: string) {
  const [state, setState] = useState(EMPTY);

  useEffect(() => {
    setState(EMPTY);
    if (!host) return;

    let cancelled = false;
    let inFlight = false;
    const poll = async () => {
      // A slow response would otherwise stack requests up behind the 2 second interval
      if (inFlight) return;
      inFlight = true;
      try {
        const readings = await fetchReadings(host);
        if (!cancelled) setState({ readings, updatedAt: Date.now(), error: null });
      } catch (err) {
        const error = err instanceof Error ? err.message : String(err);
        if (!cancelled) setState((previous) => ({ ...previous, error }));
      } finally {
        inFlight = false;
      }
    };

    void poll();
    const timer = setInterval(poll, POLL_INTERVAL_MS);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [host]);

  return state;
}
