import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { Theme } from "../constants/styles";
import SwitchButton from "../components/UI/SwitchButton";
import { useTheme } from "../store/theme-context";
import DropdownMenu from "../components/UI/DropdownMenu";
import { CURRENCIES } from "../constants/currencies";
import { useCurrency } from "../store/currency-context";

export default function AppSettingScreen() {
  const { currency, setCurrency, isLoading, error } = useCurrency();
  const { isDark, theme, setPreference } = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.container}>
      <SwitchButton
        value={isDark}
        onToggle={(value) => setPreference(value ? "dark" : "light")}
      />
      <DropdownMenu
        label="Currency"
        options={CURRENCIES}
        value={currency}
        onChange={setCurrency}
        disabled={isLoading}
      />
      {isLoading && (
        <View style={styles.status}>
          <ActivityIndicator size="small" color={theme.colors.primary400} />
          <Text style={styles.statusText}>Updating exchange rate...</Text>
        </View>
      )}

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const makeStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 0,
      backgroundColor: theme.colors.primary700,
    },
    status: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginTop: 12,
    },
    statusText: { color: theme.colors.textMuted, fontSize: 13 },
    error: { color: theme.colors.error500, fontSize: 13, marginTop: 12 },
  });
};
