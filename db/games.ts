import { db } from "./client";
import { games, NewGame } from "./schema";

export async function addGame(game: NewGame): Promise<boolean> {
  const result = await db
    .insert(games)
    .values(game)
    .onConflictDoNothing({ target: games.gameID })
    .returning({ id: games.id });
  return result.length > 0;
}
