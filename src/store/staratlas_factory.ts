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
import { StarAtlasNFT } from "@/typescipt/interfaces/staratlasnft";
import { OrderAccountItemAsset } from "@/typescipt/interfaces/OrderAccountItemAsset";
import { delay } from "@/typescipt/delay/delay";

export const staratlasFactory = defineStore({
  id: "staratlas_factory",
  state: () => ({
    connection: {} as Connection,
    limiter: {} as RateLimiter,
    score_vars_ship_infos: [] as ScoreVarsShipInfo[],
    order_account_item_assets: [] as OrderAccountItemAsset[],
  }),
  actions: {
    init() {
      //this.connection = new Connection(clusterApiUrl(SOLANANETWORK));
      this.connection = new Connection(GENESYSGO);
      this.limiter = new RateLimiter({
        tokensPerInterval: 1,
        interval: 2000,
        fireImmediately: true,
      });
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
      const remainingMessages = await this.limiter.removeTokens(1);
      console.info("{calling} getOpenOrdersForAsset");

      return await getOpenOrdersForAsset(
        this.connection,
        new PublicKey(mint_address),
        TRADE_PROGRAM
      ).then((res) => {
        console.log("fetched!");
        return res;
      });
    },

    async getScoreVarsShipInfo(
      mint_address: string
    ): Promise<ScoreVarsShipInfo> {
      const remainingMessages = await this.limiter.removeTokens(1);
      console.info("{calling} getScoreVarsShipInfo");

      return await getScoreVarsShipInfo(
        this.connection,
        SCORE_PROGRAM,
        new PublicKey(mint_address)
      );
    },

    async getOpenOrdersForAsset_all(nfts: StarAtlasNFT[]) {
      console.info("{calling} getOpenOrdersForAsset_all");
      const mint_addresses = nfts
        .filter((nft) => nft.attributes.category === "ship")
        .map((nft) => nft.mint);

      for (const address of mint_addresses) {
        await delay(800);
        await getOpenOrdersForAsset(
          this.connection,
          new PublicKey(address),
          TRADE_PROGRAM
        )
          .then((result) => {
            console.info(result);
            this.order_account_item_assets.push({
              mint_address: address,
              orders: result,
            });
          })
          .catch((err) => console.error(err));
      }
    },

    async getScoreVarsShipInfo_all(nfts: StarAtlasNFT[]) {
      console.info("{calling} getScoreVarsShipInfo_all");
      const ship_mint_addresses = nfts
        .filter((nft) => nft.attributes.category === "ship")
        .map((nft) => nft.mint);

      for (const mint_address of ship_mint_addresses) {
        await getScoreVarsShipInfo(
          this.connection,
          SCORE_PROGRAM,
          new PublicKey(mint_address)
        )
          .then((result) => {
            console.info(result);
            this.score_vars_ship_infos.push(result);
          })
          .catch((err) => console.error(err));
      }
    },
  },
});
