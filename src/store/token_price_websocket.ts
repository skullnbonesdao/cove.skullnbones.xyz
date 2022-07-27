import { defineStore } from "pinia";
import { SERUMAPIWEBSOCKET } from "@/typescipt/const/serum";
import { Convert, MarketLevel1 } from "@/typescipt/websockets/MarketLevel1";
import { Ref } from "vue";

export const tokenPricesWebsocket = defineStore({
  id: "tokenPrices_websocket",
  state: () => ({
    ws: {} as WebSocket,
    m_btc: "0.0",
    m_sol: "0.0",
    m_atlas: "0.0",
    m_polis: "0.0",
  }),

  actions: {
    initMarkets() {
      this.ws = new WebSocket(SERUMAPIWEBSOCKET);
      const sub_btc_L1 = {
        op: "subscribe",
        channel: "level1",
        markets: ["BTC/USDC"],
      };
      const sub_sol_L1 = {
        op: "subscribe",
        channel: "level1",
        markets: ["SOL/USDC"],
      };
      const sub_polis_L1 = {
        op: "subscribe",
        channel: "level1",
        markets: ["POLIS/USDC"],
      };
      const sub_atlas_L1 = {
        op: "subscribe",
        channel: "level1",
        markets: ["ATLAS/USDC"],
      };

      this.ws.onopen = () => {
        this.ws.send(JSON.stringify(sub_btc_L1));
        this.ws.send(JSON.stringify(sub_sol_L1));
        this.ws.send(JSON.stringify(sub_polis_L1));
        this.ws.send(JSON.stringify(sub_atlas_L1));
        console.info("Created MarketWebsockets");
      };

      this.ws.onmessage = (event: MessageEvent) => {
        const new_market_data = Convert.toMarketLevel1(event.data);
        if (new_market_data.type === "quote") {
          switch (new_market_data.market) {
            case "BTC/USDC":
              this.m_btc = new_market_data.bestBid[0];
              console.info("{ws-message} BTC/USDC");
              break;
            case "SOL/USDC":
              this.m_sol = new_market_data.bestBid[0];
              console.info("{ws-message} SOL/USDC");
              break;
            case "ATLAS/USDC":
              this.m_atlas = new_market_data.bestBid[0];
              console.info("{ws-message} ATLAS/USDC");
              break;
            case "POLIS/USDC":
              this.m_polis = new_market_data.bestBid[0];
              console.info("{ws-message} POLIS/USDC");
              break;
          }

          /*if (
            this.markets.value.find(
              (market) => market.market == new_market_data.market
            )
          ) {
            this.markets.value = this.markets.value.map(function (market) {
              return market.market == new_market_data.market
                ? new_market_data
                : market;
            });
          } else {
            this.markets.value.push(new_market_data);
          }*/
        }
      };
    },
  },
});
