export const SORT_BY_OPTIONS = [
  { code: "DealRating", label: "Deal Rating" },
  { code: "Title", label: "Title" },
  { code: "Savings", label: "Savings" },
  { code: "Price", label: "Price" },
  { code: "Metacritic", label: "Metacritic" },
  { code: "Reviews", label: "Reviews" },
  { code: "ReviewCount", label: "Review Count" },
  { code: "Release", label: "Release" },
  { code: "Store", label: "Store" },
  { code: "Recent", label: "Recent" },
]


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