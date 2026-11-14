import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Text } from "react-native";
import { RootStackParamList } from "../constants/types";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import Input from "../components/UI/Input";
import { useTheme } from "../store/theme-context";

type Props = NativeStackScreenProps<RootStackParamList, "SearchGame">;
export default function GameSearchScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const queryRef = useRef("");
  const [submitted, setSubmitted] = useState("");
  const search = useCallback(() => {
    setSubmitted(queryRef.current.trim());
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <Input
            autoFocus
            placeholder="Search games"
            returnKeyType="search"
            onChangeText={(text) => (queryRef.current = text)}
            style={{
              backgroundColor: theme.colors.surface,
              color: theme.colors.text,
            }}
            onSubmitEditing={search}
          />
        );
      },
    });
  }, [navigation, search]);
  return (
    <Text>
      {submitted ? `Results for "${submitted}"` : "Type a game title"}
    </Text>
  );
}
