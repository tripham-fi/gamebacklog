import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { GameSearchResult, RootStackParamList } from "../constants/types";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Input from "../components/UI/Input";
import { useTheme } from "../store/theme-context";
import { Theme } from "../constants/styles";
import { searchGameByTitle } from "../api/game";
import { fromSearchResult } from "../uti/GameUtils";
import GameList from "../components/GameOutput/GameList";

type Props = NativeStackScreenProps<RootStackParamList, "SearchGame">;
export default function GameSearchScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const styles = makeStyle(theme);
  const queryRef = useRef("");
  const [submitted, setSubmitted] = useState("");
  const [games, setGames] = useState<GameSearchResult[]>([]);
  const search = useCallback(() => {
    setSubmitted(queryRef.current.trim());
  }, []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!submitted) {
      setGames([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    async function loadGames() {
      try {
        setLoading(true);
        setError(null);

        const data = await searchGameByTitle(submitted);

        if (!cancelled) {
          setGames(data);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to load games");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadGames();

    return () => {
      cancelled = true;
    };
  }, [submitted]);
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
  }, [navigation, search, theme]);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={theme.colors.accent500} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : games.length === 0 ? (
        <Text style={styles.message}>No games found</Text>
      ) : (
        <GameList games={games.map(fromSearchResult)} />
      )}
    </View>
  );
}

const makeStyle = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 0,
      backgroundColor: theme.colors.primary700,
    },
    center: {
      justifyContent: "center",
      alignItems: "center",
    },
    error: {
      color: theme.colors.text,
      fontSize: 12,
    },
    message: {
      color: theme.colors.textMuted,
      fontSize: 14,
      textAlign: "center",
    },
  });
};
