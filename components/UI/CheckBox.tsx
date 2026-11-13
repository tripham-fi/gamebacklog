import { Pressable, Text } from "react-native";
import { useTheme } from "../../store/theme-context";
import { Ionicons } from "@expo/vector-icons";

type CheckBoxProp = {
  label: string;
  checked: boolean;
  onChange: (e: boolean) => void;
};

export default function CheckBox({ label, checked, onChange }: CheckBoxProp) {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={() => onChange(!checked)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        paddingVertical: 8,
      }}
    >
      <Ionicons
        name={checked ? "checkbox" : "square-outline"}
        size={22}
        color={checked ? theme.colors.primary400 : theme.colors.textMuted}
      />
      <Text style={{ color: theme.colors.text, fontSize: 16 }}>{label}</Text>
    </Pressable>
  );
}
