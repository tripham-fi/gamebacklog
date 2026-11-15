import { DealsRequest } from "../constants/requests";
import { Game, GameSearchResult } from "../constants/types";
import { cheapSharkClient } from "./apiClient";

export async function fetchDeals(request: DealsRequest = {}): Promise<Game[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  let queryString = new URLSearchParams(request).toString();
  return cheapSharkClient.get<Game[]>(`/deals?${queryString}`);
}

export async function searchGameByTitle(title: string): Promise<GameSearchResult[]> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const queryString = new URLSearchParams({ title, limit: "20" }).toString();
  return cheapSharkClient.get<GameSearchResult[]>(`/games?${queryString}`);
}
