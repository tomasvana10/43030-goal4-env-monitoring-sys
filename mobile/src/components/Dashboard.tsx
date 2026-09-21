import { StyleSheet, Text, View } from "react-native";

import {
  formatMotion,
  formatMotionDetails,
  formatPercentage,
  formatTemperatureCelsius,
  formatUpdatedAt,
} from "../formatting";
import { useNow } from "../hooks/use-now";
import { useReadings } from "../hooks/use-readings";
import { useTheme } from "../theme";
import { DataPoint } from "./DataPoint";

export function Dashboard({ host }: { host: string }) {
  const theme = useTheme();
  const { readings, updatedAt, error } = useReadings(host);
  const now = useNow(1000);

  if (!host) {
    return <Text style={[styles.status, { color: theme.muted }]}>No server address set</Text>;
  }

  return (
    <View style={styles.dashboard}>
      {readings && (
        <View style={styles.grid}>
          <DataPoint label="Temperature" value={formatTemperatureCelsius(readings.temperatureC)} />
          <DataPoint label="Humidity" value={formatPercentage(readings.humidityPercent)} />
          <DataPoint label="Light" value={formatPercentage(readings.lightPercent)} />
          <DataPoint
            label="Motion"
            value={formatMotion(readings.motion)}
            details={formatMotionDetails(readings)}
            highlight={readings.motion}
          />
        </View>
      )}
      {error && <Text style={[styles.status, { color: theme.error }]}>{error}</Text>}
      {updatedAt !== null ? (
        <Text style={[styles.status, { color: theme.muted }]}>{formatUpdatedAt(updatedAt, now)}</Text>
      ) : (
        !error && (
          <Text style={[styles.status, { color: theme.muted }]}>Connecting to {host}...</Text>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dashboard: {
    gap: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  status: {
    fontSize: 14,
    fontVariant: ["tabular-nums"],
  },
});
