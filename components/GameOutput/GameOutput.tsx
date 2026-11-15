import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import GameHeader from "./GameHeader";
import GameList from "./GameList";
import { Theme } from "../../constants/styles";
import { useTheme } from "../../store/theme-context";
import { useEffect, useState } from "react";
import { Game } from "../../constants/types";
import { fetchDeals } from "../../api/game";
import { DealsRequest } from "../../constants/requests";
import { fromDeal } from "../../uti/GameUtils";

export default function GameOutput() {
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  const [deals, setDeals] = useState<Game[]>([]);
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
        setDeals([]);

        const data = await fetchDeals(filter);

        if (!cancelled) {
          setDeals(data);
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

  return (
    <View style={styles.container}>
      <GameHeader filter={filter} onApply={setFilter} />
      {deals.length === 0 ? (
        <View style={styles.center}>
          {loading ? (
            <ActivityIndicator size="large" color={theme.colors.accent500} />
          ) : error ? (
            <Text style={styles.error}>{error}</Text>
          ) : (
            <Text style={styles.error}>No top deals found</Text>
          )}
        </View>
      ) : (
        <GameList games={deals.map(fromDeal)} />
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
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    error: {
      color: theme.colors.text,
      fontSize: 12,
    },
  });
