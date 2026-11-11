import { StyleSheet, View } from "react-native";
import { Theme } from "../constants/styles";
import SwitchButton from "../components/UI/SwitchButton";
import { useTheme } from "../store/theme-context";

export default function AppSettingScreen() {
  const { isDark, theme, setPreference } = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.container}>
      <SwitchButton
        value={isDark}
        onToggle={(value) => setPreference(value ? "dark" : "light")}
      />
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
  });
};
