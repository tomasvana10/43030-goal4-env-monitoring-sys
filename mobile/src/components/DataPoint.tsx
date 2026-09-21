import { StyleSheet, Text, View } from "react-native";

import { useTheme } from "../theme";

type Props = {
  label: string;
  value: string;
  details?: string;
  highlight?: boolean;
};

export function DataPoint({ label, value, details, highlight = false }: Props) {
  const theme = useTheme();
  return (
    <View style={[styles.tile, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <Text style={[styles.label, { color: theme.muted }]}>{label}</Text>
      <Text style={[styles.value, { color: highlight ? theme.accent : theme.text }]}>{value}</Text>
      {details !== undefined && (
        <Text style={[styles.details, { color: theme.muted }]}>{details}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flexBasis: "47%",
    flexGrow: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    gap: 4,
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 28,
    fontWeight: "600",
    fontVariant: ["tabular-nums"],
  },
  details: {
    fontSize: 13,
  },
});
