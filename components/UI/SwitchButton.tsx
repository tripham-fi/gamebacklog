import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { Theme } from "../../constants/styles";
import { useTheme } from "../../store/theme-context";

type SwitchProp = {
  value: boolean;
  onToggle: (value: boolean) => void;
};

export default function SwitchButton({ value, onToggle }: SwitchProp) {
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dark Mode</Text>
      <Switch
        trackColor={{
          false: theme.colors.border,
          true: theme.colors.primary400,
        }}
        thumbColor={value ? theme.colors.primary50 : theme.colors.surface}
        ios_backgroundColor={theme.colors.border}
        onValueChange={onToggle}
        value={value}
      />
    </View>
  );
}

const makeStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    label: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: "bold",
    },
  });
};
