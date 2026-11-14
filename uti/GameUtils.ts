import { Game, GameCardData } from "../constants/types";

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

