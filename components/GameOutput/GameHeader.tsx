import { Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Ionicons } from "@expo/vector-icons";

export default function GameHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Top Deals</Text>
      <Pressable
        onPress={() => console.log("filtering")}
        style={({ pressed }) => [styles.filterBar, pressed && styles.pressed]}
      >
        <Ionicons
          name="filter"
          size={18}
          color={GlobalStyles.colors.textMuted}
        />
        <Text style={styles.filterText}>Filter</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  label: {
    fontSize: 28,
    fontWeight: "bold",
    color: GlobalStyles.colors.text,
    marginBottom: 16,
  },
  filterBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.border,
    backgroundColor: GlobalStyles.colors.surface,
  },
  filterText: {
    color: GlobalStyles.colors.textMuted,
    fontSize: 14,
  },
  pressed: {
    opacity: 0.75,
  },
});
