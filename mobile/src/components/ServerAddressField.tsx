import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import { normaliseAddress } from "../formatting";
import { useTheme } from "../theme";

type Props = {
  value: string;
  onSave: (address: string) => void;
};

export function ServerAddressField({ value, onSave }: Props) {
  const theme = useTheme();
  const [draft, setDraft] = useState(value);

  const commit = () => {
    const next = normaliseAddress(draft);
    setDraft(next);
    if (next !== value) onSave(next);
  };

  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: theme.muted }]}>Server address</Text>
      <View style={[styles.box, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <Text style={[styles.prefix, { color: theme.muted }]}>https://</Text>
        <TextInput
          style={[styles.input, { color: theme.text }]}
          value={draft}
          onChangeText={setDraft}
          onSubmitEditing={commit}
          onBlur={commit}
          placeholder="Not set"
          placeholderTextColor={theme.muted}
          accessibilityLabel="Server address"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="url"
          returnKeyType="done"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: 6,
  },
  label: {
    fontSize: 14,
  },
  box: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
  prefix: {
    fontSize: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
});
