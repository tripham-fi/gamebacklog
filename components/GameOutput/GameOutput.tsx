import { StyleSheet, View } from "react-native";
import GameHeader from "./GameHeader";
import GameList from "./GameList";
import { Theme } from "../../constants/styles";
import { useTheme } from "../../store/theme-context";

export default function GameOutput() {
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.container}>
      <GameHeader />
      <GameList />
    </View>
  );
}

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 0,
      backgroundColor: theme.colors.primary700,
    },
  });
