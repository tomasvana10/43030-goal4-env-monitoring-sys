import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={[styles.screen]}>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  }
});
