export interface MarketTableElements {
  _id: string;
  mint: string;
  name: string;
  symbol: string;
  vwap: number;
  price_ask_usdc: number;
  price_ask_atlas: number;
  price_bid_usdc: number;
  price_bid_atlas: number;

  price_ask_usdc_discount: number;
  price_ask_atlas_discount: number;
  price_bid_usdc_discount: number;
  price_bid_atlas_discount: number;

  apr_usdc: number;
  apr_atlas: number;
}
