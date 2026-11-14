import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { useTheme } from "../../store/theme-context";
import { Theme } from "../../constants/styles";

interface InputProp extends TextInputProps {
  label?: string;
  propStyle?: StyleProp<ViewStyle>;
}

export default function Input({
  label,
  style,
  propStyle,
  multiline,
  ...textInputConfigs
}: InputProp) {
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={[styles.inputContainer, propStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholderTextColor={theme.colors.textMuted}
        {...textInputConfigs}
        multiline={multiline}
        style={[styles.input, multiline && styles.inputMultiline, style]}
      />
    </View>
  );
}

const makeStyles = (theme: Theme) => {
  return StyleSheet.create({
    inputContainer: {
      marginHorizontal: 4,
      marginVertical: 8,
    },
    label: {
      fontSize: 12,
      color: theme.colors.primary100,
      marginBottom: 4,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.primary100,
      color: theme.colors.textMuted,
      padding: 6,
      borderRadius: 6,
      fontSize: 18,
    },
    inputMultiline: {
      minHeight: 100,
      textAlignVertical: "top",
    },
  });
};
