import { DealsRequest } from "../constants/requests";
import { Game } from "../constants/types";
import { cheapSharkClient } from "./apiClient";

export function fetchDeals({
  storeID = "1",
  pageSize = "5",
  upperPrice = "15",
  desc = "1",
  onSale = "1",
}: DealsRequest = {}): Promise<Game[]> {
  const params = {
    storeID,
    pageSize,
    upperPrice,
    desc,
    onSale,
  };
  let queryString = new URLSearchParams(params).toString();

  console.log(`/deals?${queryString}`);

  return cheapSharkClient.get<Game[]>(`/deals?${queryString}`);
}
