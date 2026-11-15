import { Game, GameCardData, GameSearchResult } from "../constants/types";

export function getDiscountedPercentage(origin: number, discounted: number) {
  if (origin <= 0) return "-0%";
  const discountedPercentage = (1 - discounted / origin) * 100;
  return `-${Math.floor(discountedPercentage)}%`;
}

export function fromDeal(d: Game): GameCardData {
  return {
    dealID: d.dealID,
    gameID: d.gameID,
    title: d.title,
    thumb: d.thumb,
    price: Number(d.salePrice),
    normalPrice: Number(d.normalPrice),
  };
}

export function fromSearchResult(g: GameSearchResult): GameCardData {
  return {
    dealID: g.gameID,
    gameID: g.gameID,
    title: g.external,
    thumb: g.thumb,
    price: Number(g.cheapest),
  };
}
