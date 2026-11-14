import { FlatList, ListRenderItemInfo, Text } from "react-native";
import { Game, GameCardData } from "../../constants/types";
import GameItem from "./GameItem";

interface GameListProp {
  games: GameCardData[];
}

function renderGameItem(itemData: ListRenderItemInfo<GameCardData>) {
  return <GameItem {...itemData.item} />;
}

export default function GameList({ games }: GameListProp) {
  return (
    <FlatList
      data={games}
      renderItem={renderGameItem}
      keyExtractor={(item) => item.dealID}
      contentContainerStyle={{ paddingBottom: 24 }}
    />
  );
}
