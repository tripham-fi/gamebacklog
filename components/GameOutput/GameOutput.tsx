import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import GameHeader from "./GameHeader";
import GameList from "./GameList";

export default function GameOutput() {
  return (
    <View style={styles.container}>
      <GameHeader />
      <GameList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
