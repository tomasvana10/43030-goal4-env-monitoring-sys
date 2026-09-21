import { useColorScheme } from "react-native";

type Theme = Record<string, string>;

const light = {
  background: "#f4f4f1",
  card: "#ffffff",
  border: "#e2e1dc",
  text: "#1c1c1a",
  muted: "#6b6a64",
  accent: "#2e7d5b",
  error: "#c0392b",
} satisfies Theme;

const dark = {
  background: "#121211",
  card: "#1d1d1b",
  border: "#2e2e2b",
  text: "#f2f1ec",
  muted: "#9b9a93",
  accent: "#4cc38a",
  error: "#ff6b5e",
} satisfies Theme;

export function useTheme() {
  return useColorScheme() === "dark" ? dark : light;
}
