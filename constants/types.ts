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
