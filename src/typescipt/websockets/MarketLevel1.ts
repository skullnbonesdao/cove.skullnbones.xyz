export interface MarketLevel1 {
  type: string;
  market: string;
  timestamp: Date;
  slot: number;
  version: number;
  bestAsk: string[];
  bestBid: string[];
}

// Converts JSON strings to/from your types
export class Convert {
  public static toMarketLevel1(json: string): MarketLevel1 {
    return JSON.parse(json);
  }

  public static marketLevel1ToJson(value: MarketLevel1): string {
    return JSON.stringify(value);
  }
}
