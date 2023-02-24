import { defineStore } from "pinia";
import { SERUMAPIWEBSOCKET } from "@/typescipt/const/serum";
import { Convert, MarketLevel1 } from "@/typescipt/websockets/MarketLevel1";
import { Ref } from "vue";
import { CoingeckoTokenInfo } from "@/typescipt/interfaces/CoingeckoTokenInfo";

const VITE_CGBITCOIN =
  "https://api.coingecko.com/api/v3/coins/markets/?vs_currency=usd&ids=bitcoin&order=market_cap_desc&per_page=100&page=1&sparkline=false";

const VITE_CGSOLANA =
  "https://api.coingecko.com/api/v3/coins/markets/?vs_currency=usd&ids=solana&order=market_cap_desc&per_page=100&page=1&sparkline=false";

const VITE_CGPOLIS =
  "https://api.coingecko.com/api/v3/coins/markets/?vs_currency=usd&ids=star-atlas-dao&order=market_cap_desc&per_page=100&page=1&sparkline=false";

const VITE_CGATLAS =
  "https://api.coingecko.com/api/v3/coins/markets/?vs_currency=usd&ids=star-atlas&order=market_cap_desc&per_page=100&page=1&sparkline=false";

export const tokenPricesWebsocket = defineStore({
  id: "tokenPrices_websocket",
  state: () => ({
    token_price: {
      bitcoin: 0,
      solana: 0,
      atlas: 0,
      polis: 0,
    },
    change24h: {
      bitcoin: 0.0,
      solana: 0.0,
      atlas: 0.0,
      polis: 0.0,
    },
  }),
  actions: {
    async init() {
      fetch(VITE_CGBITCOIN)
        .then((res) => res.json())
        .then((data: CoingeckoTokenInfo[]) => {
          this.token_price.bitcoin = data[0].current_price;
          this.change24h.bitcoin = data[0].price_change_percentage_24h;
        });

      fetch(VITE_CGSOLANA)
        .then((res) => res.json())
        .then((data: CoingeckoTokenInfo[]) => {
          this.token_price.solana = data[0].current_price;
          this.change24h.solana = data[0].price_change_percentage_24h;
        });

      fetch(VITE_CGPOLIS)
        .then((res) => res.json())
        .then((data: CoingeckoTokenInfo[]) => {
          this.token_price.polis = data[0].current_price;
          this.change24h.polis = data[0].price_change_percentage_24h;
        });

      fetch(VITE_CGATLAS)
        .then((res) => res.json())
        .then((data: CoingeckoTokenInfo[]) => {
          this.token_price.atlas = data[0].current_price;
          this.change24h.atlas = data[0].price_change_percentage_24h;
        });
    },
  },
});
