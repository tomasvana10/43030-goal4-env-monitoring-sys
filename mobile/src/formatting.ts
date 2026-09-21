import type { Readings } from "./api";

const NO_READING_REPR = "No reading";

function asPluralForm(n: number, unit: string) {
  return `${n} ${unit}${n === 1 ? "" : "s"}`;
}

export function formatElapsedTime(seconds: number) {
  if (seconds < 60) return asPluralForm(seconds, "second");
  if (seconds < 3600) return asPluralForm(Math.floor(seconds / 60), "minute");
  return asPluralForm(Math.floor(seconds / 3600), "hour");
}

export function formatTemperatureCelsius(celsius: number | null) {
  return celsius === null ? NO_READING_REPR : `${celsius.toFixed(1)} °C`;
}

export function formatPercentage(percent: number | null) {
  return percent === null ? NO_READING_REPR : `${Math.round(percent)}%`;
}

export function formatMotion(motion: boolean) {
  return motion ? "Detected" : "None";
}

export function formatMotionDetails(readings: Readings) {
  if (readings.motion) return undefined;
  if (readings.secondsSinceMotion === null) return "Not detected since startup";
  return `Last detected ${formatElapsedTime(readings.secondsSinceMotion)} ago`;
}

export function formatUpdatedAt(updatedAt: number, now: number) {
  const seconds = Math.max(0, Math.floor((now - updatedAt) / 1000));
  return `Updated ${formatElapsedTime(seconds)} ago`;
}

export function normaliseAddress(input: string) {
  return input
    .trim()
    .replace(/^[a-z][a-z0-9+.-]*:\/\//i, "")
    .replace(/[/?#].*$/, "")
    .toLowerCase();
}