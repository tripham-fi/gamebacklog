import { FlatList, ListRenderItemInfo, Text } from "react-native";
import { Game } from "../../constants/types";
import GameItem from "./GameItem";

interface GameListProp {
  games?: Game[];
}
const DUMMY_DATA: Game[] = [
  {
    title: "Deus Ex: Human Revolution - Director's Cut",
    dealID: "HhzMJAgQYGZ%2B%2BFPpBG%2BRFcuUQZJO3KXvlnyYYGwGUfU%3D",
    gameID: "102249",
    salePrice: "2.99",
    normalPrice: "19.99",
    isOnSale: "1",
    steamRatingText: "Very Positive",
    steamRatingPercent: "92",
    steamRatingCount: "17993",
    releaseDate: 1382400000,
    lastChange: 1621536418,
    thumb:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/238010/capsule_sm_120.jpg?t=1619788192",
  },
  {
    title: "Thief: Deadly Shadows",
    dealID: "EX0oH20b7A1H2YiVjvVx5A0HH%2F4etw3x%2F6YMGVPpKbA%3D",
    gameID: "396",
    salePrice: "0.98",
    normalPrice: "8.99",
    isOnSale: "1",
    steamRatingText: "Very Positive",
    steamRatingPercent: "81",
    steamRatingCount: "1670",
    releaseDate: 1085443200,
    lastChange: 1621540561,
    thumb:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/6980/capsule_sm_120.jpg?t=1592493801",
  },
  {
    title: "Just Cause 2",
    dealID: "z4El8C19yCEHrk1%2ByEedebThQVbblI7H0Z%2BAmxgZiS8%3D",
    gameID: "180",
    salePrice: "1.49",
    normalPrice: "14.99",
    isOnSale: "1",
    steamRatingText: "Very Positive",
    steamRatingPercent: "90",
    steamRatingCount: "35296",
    releaseDate: 1269302400,
    lastChange: 1621536477,
    thumb:
      "https://cdn.cloudflare.steamstatic.com/steam/apps/8190/capsule_sm_120.jpg?t=1593180404",
  },
];

function renderGameItem(itemData: ListRenderItemInfo<Game>) {
  return <GameItem {...itemData.item} />;
}

export default function GameList({ games = DUMMY_DATA }: GameListProp) {
  return (
    <FlatList
      data={games}
      renderItem={renderGameItem}
      keyExtractor={(item) => item.dealID}
      contentContainerStyle={{ paddingBottom: 24 }}
    />
  );
}
