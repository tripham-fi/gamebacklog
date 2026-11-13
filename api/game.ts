import { DealsRequest } from "../constants/requests";
import { Game } from "../constants/types";
import { cheapSharkClient } from "./apiClient";

export function fetchDeals(request: DealsRequest = {}): Promise<Game[]> {
  let queryString = new URLSearchParams(request).toString();
  return cheapSharkClient.get<Game[]>(`/deals?${queryString}`);
}
