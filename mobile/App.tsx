import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { ServerAddressField } from "./src/components/ServerAddressField";
import { Dashboard } from "./src/components/Dashboard";
import { useServerAddress } from "./src/hooks/use-server-address";
import { useTheme } from "./src/theme";

export default function App() {
  const theme = useTheme();
  const [address, saveAddress] = useServerAddress();

  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.screen, { backgroundColor: theme.background }]}>
        <StatusBar style="auto" />
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={[styles.heading, { color: theme.text }]}>Environment Monitor</Text>
          {address !== null && (
            <>
              <ServerAddressField value={address} onSave={saveAddress} />
              <Dashboard host={address} />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 20,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
  },
});
