export type RootStackParamList = {
  BacklogOverview: undefined;
  SearchGame: undefined;
};

export type RootBottomTabsParamList = {
  GameBrowse: undefined;
  MyGame: undefined;
  MyWishList: undefined;
  AppSetting: undefined;
};

export type Option = { code: string; label: string };

export type Game = {
  gameID: string;
  dealID: string;
  title: string;
  salePrice: string;
  normalPrice: string;
  isOnSale: string;
  steamRatingText: string;
  steamRatingPercent: string;
  steamRatingCount: string;
  releaseDate: number;
  lastChange: number;
  thumb: string;
};

export type currencyRate = {
  date: Date;
  base: string;
  quote: string;
  rate: number
}

export type ErrorResult = {
  status: number;
  message: string;
};

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}
