import { defineStore } from "pinia";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import {
  getAllOpenOrders,
  getMarketVarsAccount,
  getMarketVarsAccountInfo,
  getOpenOrdersForAsset,
  OrderAccountItem,
} from "@staratlas/factory";
import { GENESYSGO, SOLANANETWORK } from "@/typescipt/const/solana";

export const staratlasFactory = defineStore({
  id: "staratlas_factory",
  state: () => ({
    connection: {} as Connection,
  }),
  actions: {
    init() {
      //this.connection = new Connection(clusterApiUrl(SOLANANETWORK));
      this.connection = new Connection(GENESYSGO);
    },
    async getAllOpenOrders() {
      getAllOpenOrders(
        this.connection,
        new PublicKey("traderDnaR5w6Tcoi3NFm53i48FTDNbGjBSZwWXDRrg")
      ).then((r) => {
        console.log(r);
        r.forEach((e) => console.log(e.account.assetMint.toBase58()));
        //r.forEach((e) => console.log(e.publicKey.toBase58()));
      });
    },
    async getOpenOrdersForAsset(
      mint_address: string
    ): Promise<OrderAccountItem[]> {
      return await getOpenOrdersForAsset(
        this.connection,
        new PublicKey(mint_address),
        new PublicKey("traderDnaR5w6Tcoi3NFm53i48FTDNbGjBSZwWXDRrg")
      );
    },
  },
});
