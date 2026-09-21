import { formatElapsedTime } from "./formatting";

export const REQUEST_TIMEOUT_MS = 5000;

export type Readings = {
  temperatureC: number | null;
  humidityPercent: number | null;
  lightPercent: number;
  motion: boolean;
  secondsSinceMotion: number | null;
};

export async function fetchReadings(host: string) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch(`https://${host}/api/readings`, { signal: controller.signal });
  } catch {
    throw new Error(
      controller.signal.aborted ? describeTimeout(host) : `Cannot connect to ${host}`,
    );
  } finally {
    clearTimeout(timer);
  }
  if (!response.ok) {
    throw new Error(`${host} responded with HTTP ${response.status}`);
  }
  return parseReadings(await response.json().catch(() => null), host);
}

function describeTimeout(host: string) {
  const timeout = formatElapsedTime(REQUEST_TIMEOUT_MS / 1000);
  return `Cannot connect to ${host}. Request timed out after ${timeout}.`;
}

function parseReadings(body: unknown, host: string): Readings {
  const json = (typeof body === "object" && body !== null ? body : {}) as Record<string, unknown>;
  const describeMissing = (field: string) => `Unexpected response from ${host}: missing ${field}`;

  const readNumber = (field: string) => {
    const value = json[field];
    if (typeof value !== "number") throw new Error(describeMissing(field));
    return value;
  };
  const readNumberOrNull = (field: string) => (json[field] === null ? null : readNumber(field));

  const temperatureC = readNumberOrNull("temperature_c");
  const humidityPercent = readNumberOrNull("humidity_percent");
  const lightPercent = readNumber("light_percent");
  if (typeof json.motion !== "boolean") throw new Error(describeMissing("motion"));
  const secondsSinceMotion = readNumberOrNull("seconds_since_motion");

  return { temperatureC, humidityPercent, lightPercent, motion: json.motion, secondsSinceMotion };
}
