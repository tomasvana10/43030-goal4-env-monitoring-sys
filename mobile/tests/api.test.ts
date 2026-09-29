import { fetchReadings, REQUEST_TIMEOUT_MS } from "../src/api";

const HOST = "env-monitor.tomasvana.dev";
const BODY = {
  temperature_c: 23.4,
  humidity_percent: 45,
  light_percent: 62,
  motion: false,
  seconds_since_motion: null,
};

function respond(status: number, body: unknown) {
  globalThis.fetch = jest
    .fn()
    .mockResolvedValue({ ok: status < 300, status, json: async () => body });
}

test("Maps the response body to readings", async () => {
  respond(200, BODY);
  await expect(fetchReadings(HOST)).resolves.toEqual({
    temperatureC: 23.4,
    humidityPercent: 45,
    lightPercent: 62,
    motion: false,
    secondsSinceMotion: null,
  });
});

test("Identifies the HTTP status", async () => {
  respond(404, {});
  await expect(fetchReadings(HOST)).rejects.toThrow(
    "env-monitor.tomasvana.dev responded with HTTP 404",
  );
});

test("Identifies the first missing field", async () => {
  respond(200, { ...BODY, light_percent: undefined });
  await expect(fetchReadings(HOST)).rejects.toThrow(
    "Unexpected response from env-monitor.tomasvana.dev: missing light_percent",
  );
});

test("Aborts after the configured timeout", async () => {
  jest.useFakeTimers();
  globalThis.fetch = jest.fn(
    (_url: RequestInfo | URL, init?: RequestInit) =>
      new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => reject(new Error("Aborted")));
      }),
  );
  const result = fetchReadings(HOST);
  jest.advanceTimersByTime(REQUEST_TIMEOUT_MS);
  await expect(result).rejects.toThrow(
    "Cannot connect to env-monitor.tomasvana.dev. Request timed out after 5 seconds.",
  );
  jest.useRealTimers();
});
