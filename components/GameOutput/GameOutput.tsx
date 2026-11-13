import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import GameHeader from "./GameHeader";
import GameList from "./GameList";
import { Theme } from "../../constants/styles";
import { useTheme } from "../../store/theme-context";
import { useEffect, useState } from "react";
import { Game } from "../../constants/types";
import { fetchDeals } from "../../api/game";
import { DealsRequest } from "../../constants/requests";

export default function GameOutput() {
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  const [games, setGames] = useState<Game[]>([]);
  const [filter, setFilter] = useState<DealsRequest>({
    storeID: "1",
    pageSize: "5",
    upperPrice: "15",
    onSale: "1",
    desc: "1",
    sortBy: "DealRating",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function loadGames() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchDeals(filter);

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
  }, [filter]);

  if (loading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={theme.colors.accent500} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GameHeader filter={filter} onApply={(e) => setFilter(e)} />
      {error ? (
        <View style={[styles.container, styles.center]}>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : (
        <GameList games={games} />
      )}
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
    center: {
      justifyContent: "center",
      alignItems: "center",
    },
    error: {
      color: theme.colors.text,
      fontSize: 12,
    },
  });
