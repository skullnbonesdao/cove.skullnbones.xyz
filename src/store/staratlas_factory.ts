import { defineStore } from "pinia";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import {
  getAllOpenOrders,
  getMarketVarsAccount,
  getMarketVarsAccountInfo,
  getOpenOrdersForAsset,
  getScoreVarsShipInfo,
  OrderAccountItem,
  ScoreVarsShipInfo,
} from "@staratlas/factory";
import { GENESYSGO, SOLANANETWORK } from "@/typescipt/const/solana";
import { SCORE_PROGRAM, TRADE_PROGRAM } from "@/typescipt/const/staratlas";
import { RateLimiter } from "limiter";

export const staratlasFactory = defineStore({
  id: "staratlas_factory",
  state: () => ({
    connection: {} as Connection,
    limiter: {} as RateLimiter,
  }),
  actions: {
    init() {
      //this.connection = new Connection(clusterApiUrl(SOLANANETWORK));
      this.connection = new Connection(GENESYSGO);
      this.limiter = new RateLimiter({ tokensPerInterval: 1, interval: 500 });
    },
    async getAllOpenOrders() {
      getAllOpenOrders(this.connection, TRADE_PROGRAM).then((r) => {
        console.log(r);
        r.forEach((e) => console.log(e.account.assetMint.toBase58()));
      });
    },
    async getOpenOrdersForAsset(
      mint_address: string
    ): Promise<OrderAccountItem[]> {
      await this.limiter.removeTokens(1);

      return await getOpenOrdersForAsset(
        this.connection,
        new PublicKey(mint_address),
        TRADE_PROGRAM
      );
    },

    async getScoreVarsShipInfo(
      mint_address: string
    ): Promise<ScoreVarsShipInfo> {
      await this.limiter.removeTokens(1);

      return await getScoreVarsShipInfo(
        this.connection,
        SCORE_PROGRAM,
        new PublicKey(mint_address)
      );
    },
  },
});
