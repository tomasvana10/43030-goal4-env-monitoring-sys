import { normaliseAddress } from "../src/formatting";

test("Extracts the host from a pasted URL", () => {
  expect(normaliseAddress("  https://Env-Monitor.TomasVana.dev/api/readings ")).toBe(
    "env-monitor.tomasvana.dev",
  );
  expect(normaliseAddress("env-monitor.tomasvana.dev:8443")).toBe("env-monitor.tomasvana.dev:8443");
});
