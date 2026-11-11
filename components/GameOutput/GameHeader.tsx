import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../store/theme-context";
import { Theme } from "../../constants/styles";

export default function GameHeader() {
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Top Deals</Text>
      <Pressable
        onPress={() => console.log("filtering")}
        style={({ pressed }) => [styles.filterBar, pressed && styles.pressed]}
      >
        <Ionicons name="filter" size={18} color={theme.colors.textMuted} />
        <Text style={styles.filterText}>Filter</Text>
      </Pressable>
    </View>
  );
}
const makeStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      marginBottom: 8,
    },
    label: {
      fontSize: 28,
      fontWeight: "bold",
      color: theme.colors.text,
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
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    filterText: {
      color: theme.colors.textMuted,
      fontSize: 14,
    },
    pressed: {
      opacity: 0.75,
    },
  });
};
