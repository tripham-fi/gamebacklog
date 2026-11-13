export function getDiscountedPercentage(origin: number, discounted: number) {
  if (origin <= 0) return "-0%";
  const discountedPercentage = (1 - discounted / origin) * 100;
  return `-${Math.floor(discountedPercentage)}%`;
}
