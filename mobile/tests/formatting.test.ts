import { formatElapsedTime, formatMotionDetails, formatTemperatureCelsius } from "../src/formatting";

test("Selects a unit and pluralisation for elapsed time", () => {
  expect(formatElapsedTime(1)).toBe("1 second");
  expect(formatElapsedTime(59)).toBe("59 seconds");
  expect(formatElapsedTime(179)).toBe("2 minutes");
  expect(formatElapsedTime(3600)).toBe("1 hour");
});

test("Shows a null sensor value as having no reading", () => {
  expect(formatTemperatureCelsius(23.44)).toBe("23.4 °C");
  expect(formatTemperatureCelsius(null)).toBe("No reading");
});

test("Describes when motion was last seen", () => {
  const readings = {
    temperatureC: 20,
    humidityPercent: 40,
    lightPercent: 50,
    motion: false,
    secondsSinceMotion: 125,
  };
  expect(formatMotionDetails(readings)).toBe("Last detected 2 minutes ago");
  expect(formatMotionDetails({ ...readings, secondsSinceMotion: null })).toBe(
    "Not detected since startup",
  );
});
