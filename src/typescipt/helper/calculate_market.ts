export function calculatesPercentageVWAPvsMarket(
  vwap: number,
  market: number,
  disable: boolean
): number {
  if (market === 0 || disable) {
    return 0;
  }
  if (vwap > market) {
    return -(1 - market / vwap) * 100;
  }
  if (vwap <= market) {
    return (market / vwap - 1) * 100;
  }
  return 0;
}
