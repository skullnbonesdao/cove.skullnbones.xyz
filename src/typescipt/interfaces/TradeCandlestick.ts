export interface ID {
  time: string;
}
export interface TradeCandlestick {
  _id: ID;
  high: number;
  low: number;
  open: number;
  close: number;
}
