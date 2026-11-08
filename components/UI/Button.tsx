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
import { GlobalStyles } from "../../constants/styles";

type Props = {
  children: ReactNode;
  onPress: () => void;
  style?: StyleProp<TextStyle | ViewStyle>;
};

export default function Button({ children, onPress, style }: Props) {
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

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: GlobalStyles.colors.primary400,
  },
  buttonText: {
    color: GlobalStyles.colors.onPrimary,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
  },
  pressed: {
    opacity: 0.75,
  },
});
