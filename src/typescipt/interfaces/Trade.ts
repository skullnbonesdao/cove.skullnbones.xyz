export interface Trade {
  block: number;
  seller_token: string;
  seller_amount: number;
  seller_decimals: number;
  buyer_token: string;
  buyer_amount: number;
  buyer_decimals: number;
}
