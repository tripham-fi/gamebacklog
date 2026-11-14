import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { GameCardData } from "../../constants/types";
import Button from "../UI/Button";
import { Theme } from "../../constants/styles";
import { useTheme } from "../../store/theme-context";
import { useCurrency } from "../../store/currency-context";
import { getDiscountedPercentage } from "../../uti/GameUtils";

interface GameItemProp extends GameCardData {}

export default function GameItem({
  title,
  price,
  normalPrice,
  thumb,
}: GameItemProp) {
  const { format } = useCurrency();
  const { theme } = useTheme();
  const styles = makeStyles(theme);
  const hasDiscount = normalPrice !== undefined && normalPrice > price;
  return (
    <View style={styles.card}>
      <Pressable
        style={({ pressed }) => [styles.container, pressed && styles.pressed]}
        android_ripple={{ color: "#ccc" }}
      >
        <View style={styles.info}>
          <Image source={{ uri: thumb }} style={styles.thumb} />
          <View style={styles.summary}>
            {hasDiscount && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {getDiscountedPercentage(Number(normalPrice), Number(price))}
                </Text>
              </View>
            )}
            <Text style={styles.title} numberOfLines={2}>
              {title}
            </Text>
            <View style={styles.priceColumn}>
              {hasDiscount && (
                <Text style={styles.normalPrice}>
                  {format(Number(normalPrice))}
                </Text>
              )}
              <Text style={styles.salePrice}>{format(Number(price))}</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button onPress={() => console.log("Adding")}>Add to backlog</Button>
        </View>
      </Pressable>
    </View>
  );
}

const makeStyles = (theme: Theme) => {
  return StyleSheet.create({
    card: {
      marginVertical: 8,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      overflow: Platform.OS === "android" ? "hidden" : "visible",
      elevation: 4,
      shadowColor: "#000",
      shadowRadius: 4,
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.4,
    },
    container: {
      flexDirection: "column",
    },
    info: {
      flexDirection: "row",
      alignItems: "flex-start",
      padding: 12,
      gap: 12,
    },
    summary: {
      flex: 1,
      gap: 6,
    },
    thumb: {
      width: 120,
      height: 50,
      borderRadius: 6,
    },
    badge: {
      alignSelf: "flex-start",
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 6,
      backgroundColor: theme.colors.primary400,
    },
    badgeText: {
      color: theme.colors.onPrimary,
      fontSize: 13,
      fontWeight: "bold",
    },
    title: {
      color: theme.colors.text,
      fontSize: 16,
      fontWeight: "bold",
    },
    priceColumn: {
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 2,
    },
    normalPrice: {
      color: theme.colors.textMuted,
      fontSize: 13,
      textDecorationLine: "line-through",
    },
    salePrice: {
      color: theme.colors.primary400,
      fontSize: 18,
      fontWeight: "bold",
    },
    buttonContainer: {
      paddingHorizontal: 12,
      paddingBottom: 12,
    },
    pressed: {
      opacity: 0.75,
    },
  });
};
