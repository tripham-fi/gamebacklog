export type DealsRequest = {
  storeID?: string;
  pageNumber?: string;
  pageSize?: string;
  sortBy?:
    | "DealRating"
    | "Title"
    | "Savings"
    | "Price"
    | "Metacritic"
    | "Reviews"
    | "ReviewCount"
    | "Release"
    | "Store"
    | "Recent";
  desc?: "1" | "0";
  lowerPrice?: string;
  upperPrice?: string;
  metacritic?: string;
  steamRating?: string;
  minimumReviewCount?: string;
  onSale?: "1" | "0";
};
