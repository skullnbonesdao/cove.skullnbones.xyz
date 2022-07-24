<template>
  <div class="">
    <h1 class="text-center p-2">Market</h1>

    <div class="flex flex-col space-y-3">
      <div class="bg-base-300 p-4">
        <h2 class="text-center">BUY</h2>
        <div class="grid grid-cols-2 gap-2 place-content-center">
          <div>
            <h3 class="text-center pb-2">USDC</h3>
            <MarketOrders
              :market_orders="market_orders_buy_usdc"
              market_token="USDC"
            />
          </div>
          <div>
            <h3 class="text-center pb-2">ATLAS</h3>
            <MarketOrders
              :market_orders="market_orders_buy_atlas"
              market_token="ATLAS"
            />
          </div>
        </div>
      </div>
      <div class="bg-base-300 p-4">
        <h2 class="text-center">SELL</h2>
        <div class="flex flex-row space-x-4">
          <div class="basis-1/2">
            <h3 class="text-center pb-2">USDC</h3>
            <MarketOrders
              :market_orders="market_orders_sell_usdc"
              market_token="USDC"
            />
          </div>
          <div class="basis-1/2">
            <h3 class="text-center pb-2">ATLAS</h3>
            <MarketOrders
              :market_orders="market_orders_sell_atlas"
              market_token="ATLAS"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: "MarketTab",
};
</script>

<script setup lang="ts">
import { defineProps, watch, ref, onMounted } from "vue";
import { staratlasStore } from "@/store/staratlas_store";
import { staratlasFactory } from "@/store/staratlas_factory";
import {
  OrderAccountInfo,
  OrderAccountItem,
  OrderSide,
} from "@staratlas/factory";
import { TOKEN_ATLAS, TOKEN_USDC } from "@/typescipt/const/tokens";
import MarketOrders from "@/components/table/components/MarketOrders.vue";

const props = defineProps({
  mint_address: {
    type: String,
    default: null,
  },
});

const staratlas_data = staratlasStore();
const staratlas_factory = staratlasFactory();

let market_orders_buy_usdc = ref([] as OrderAccountItem[]);
let market_orders_buy_atlas = ref([] as OrderAccountItem[]);

let market_orders_sell_usdc = ref([] as OrderAccountItem[]);
let market_orders_sell_atlas = ref([] as OrderAccountItem[]);

onMounted(async () => {
  if (props.mint_address) {
    const market_orders: OrderAccountItem[] =
      await staratlas_factory.getOpenOrdersForAsset(props.mint_address);

    const market_orders_buy = market_orders.filter((orders) =>
      JSON.stringify(orders.account.orderSide).includes("buy")
    );

    market_orders_buy_usdc.value = market_orders_buy
      .filter(
        (orders) =>
          orders.account.currencyMint.toBase58() == TOKEN_USDC.toBase58()
      )
      .sort((a, b) => b.account.price - a.account.price);

    market_orders_buy_atlas.value = market_orders_buy
      .filter(
        (orders) =>
          orders.account.currencyMint.toBase58() == TOKEN_ATLAS.toBase58()
      )
      .sort((a, b) => b.account.price - a.account.price);

    const market_orders_sell = market_orders.filter((orders) =>
      JSON.stringify(orders.account.orderSide).includes("sell")
    );

    market_orders_sell_usdc.value = market_orders_sell
      .filter(
        (orders) =>
          orders.account.currencyMint.toBase58() == TOKEN_USDC.toBase58()
      )
      .sort((a, b) => a.account.price - b.account.price);

    market_orders_sell_atlas.value = market_orders_sell
      .filter(
        (orders) =>
          orders.account.currencyMint.toBase58() === TOKEN_ATLAS.toBase58()
      )
      .sort((a, b) => a.account.price - b.account.price);

    console.log("BUY/SELL");
    console.log(market_orders);
    console.log(market_orders_buy);
    console.log(market_orders_sell);

    console.log("BUY/BUY");
    console.log(market_orders_buy_usdc.value);
    console.log(market_orders_buy_atlas.value);
    console.log("SELL/SELL");
    console.log(market_orders_sell_usdc.value);
    console.log(market_orders_sell_atlas.value);
  }
});
</script>
