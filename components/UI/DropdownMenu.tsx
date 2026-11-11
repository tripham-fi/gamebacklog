// components/UI/Dropdown.tsx
import { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../constants/styles";
import { useTheme } from "../../store/theme-context";

type Option = { code: string; label: string };

type Props = {
  label: string;
  options: readonly Option[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export default function DropdownMenu({
  label,
  options,
  value,
  onChange,
  disabled,
}: Props) {
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  const [open, setOpen] = useState(false);

  const selected = options.find((o) => o.code === value);

  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        style={[styles.field, disabled && styles.disabled]}
        onPress={() => !disabled && setOpen(true)}
        disabled={disabled}
      >
        <Text style={styles.fieldText}>
          {selected ? `${selected.code} · ${selected.label}` : "Select"}
        </Text>
        <Ionicons
          name="chevron-down"
          size={18}
          color={theme.colors.textMuted}
        />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={styles.sheet}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.option}
                  android_ripple={{ color: theme.colors.divider }}
                  onPress={() => {
                    onChange(item.code);
                    setOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.code === value && styles.optionSelected,
                    ]}
                  >
                    {item.code} · {item.label}
                  </Text>
                  {item.code === value && (
                    <Ionicons
                      name="checkmark"
                      size={18}
                      color={theme.colors.primary400}
                    />
                  )}
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    label: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 6,
    },
    field: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      height: 48,
      paddingHorizontal: 14,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    fieldText: { color: theme.colors.text, fontSize: 16 },
    backdrop: {
      flex: 1,
      justifyContent: "center",
      padding: 24,
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    sheet: {
      maxHeight: "50%",
      borderRadius: 12,
      overflow: "hidden",
      backgroundColor: theme.colors.surface,
    },
    option: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.divider,
    },
    optionText: { color: theme.colors.text, fontSize: 16 },
    optionSelected: { fontWeight: "bold", color: theme.colors.primary400 },
    disabled: {
      opacity: 0.5,
    },
  });
