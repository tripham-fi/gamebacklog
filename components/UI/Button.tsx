import { ReactNode } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { Theme } from "../../constants/styles";
import { useTheme } from "../../store/theme-context";

type Props = {
  children: ReactNode;
  onPress: () => void;
  style?: StyleProp<TextStyle | ViewStyle>;
};

export default function Button({ children, onPress, style }: Props) {
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={styles.button}>
          <Text style={styles.buttonText}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const makeStyles = (theme: Theme) => {
  return StyleSheet.create({
    button: {
      borderRadius: 10,
      paddingVertical: 12,
      paddingHorizontal: 8,
      backgroundColor: theme.colors.primary400,
    },
    buttonText: {
      color: theme.colors.onPrimary,
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 14,
    },
    pressed: {
      opacity: 0.75,
    },
  });
};
