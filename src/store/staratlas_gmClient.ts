import { defineStore } from "pinia";
import { GmClientService, Order } from "@staratlas/factory";
import { Connection } from "@solana/web3.js";
import { PORTALRPC, ANKRRPC } from "@/typescipt/const/solana";
import { TRADE_PROGRAM } from "@/typescipt/const/staratlas";
import { TOKEN_ATLAS, TOKEN_USDC } from "@/typescipt/const/tokens";

export const staratlas_gmClientStore = defineStore({
  id: "staratlas_gmClient",

  state: () => ({
    connection: {} as Connection,
    orders: [] as Order[],
    top_market_orders: [] as TopMarketOrders[],
  }),

  actions: {
    async fetchOrders() {
      console.info("{getOrders} called!");
      const client = new GmClientService();
      await client
        .getAllOpenOrders(new Connection(ANKRRPC), TRADE_PROGRAM)
        .then((response) => {
          this.orders = response;
        })
        .catch((err) => console.log("{getOrders}: " + err));
    },

    filter_orders(nft_mint: string) {
      const nft_orders = this.orders.filter(
        (order) => order.orderMint === nft_mint
      );

      const buy_orders = nft_orders.filter(
        (order) => order.orderType === "buy"
      );
      const sell_orders = nft_orders.filter(
        (order) => order.orderType === "sell"
      );

      const buy_orders_atlas = buy_orders
        .filter((order) => order.currencyMint === TOKEN_ATLAS.toString())
        .map((order) => order.uiPrice)
        .sort((a, b) => a - b);

      const buy_orders_usdc = buy_orders
        .filter((order) => order.currencyMint === TOKEN_USDC.toString())
        .map((order) => order.uiPrice)
        .sort((a, b) => a - b);

      this.top_market_orders.push({
        mint: nft_mint,
        price_atlas_buy: buy_orders_atlas[buy_orders_atlas.length - 1] ?? -1,
        price_usdc_buy: buy_orders_usdc[buy_orders_usdc.length - 1] ?? -1,
        price_atlas_sell:
          sell_orders
            .filter((order) => order.currencyMint === TOKEN_ATLAS.toString())
            .map((order) => order.uiPrice)
            .sort((a, b) => a - b)[0] ?? -1,

        price_usdc_sell:
          sell_orders
            .filter((order) => order.currencyMint === TOKEN_USDC.toString())
            .map((order) => order.uiPrice)
            .sort((a, b) => a - b)[0] ?? -1,
      });

      console.info("{filter_orders} called!");
    },
  },
});
