<template>
  <div class="bg-base-100 p-4 rounded-xl">
    <h1 class="p-2">Market</h1>

    <div class="flex flex-col space-y-3">
      <div class="bg-base-200 shadow-inner rounded-xl p-4">
        <line-chart :mint_address="mint_address"></line-chart>
      </div>

      <div class="bg-base-200 shadow-inner rounded-xl p-4">
        <div class="collapse collapse-arrow border border-base-300 bg-base-100">
          <input type="checkbox" class="peer" />
          <div class="collapse-title text-primary-content">
            <h2 class="">CandleStickChart</h2>
          </div>
          <div class="collapse-content">
            <candle-stick-chart
              :mint_address="mint_address"
            ></candle-stick-chart>
          </div>
        </div>
      </div>

      <div class="bg-base-200 shadow-inner rounded-xl p-4 space-y-2">
        <div class="collapse collapse-arrow border border-base-300 bg-base-100">
          <input type="checkbox" class="peer" />
          <div class="collapse-title text-primary-content">
            <h2 class="">BUY Orders</h2>
          </div>
          <div class="collapse-content">
            <div
              class="bg-base-200 p-3 grid sm:grid-cols-2 grid-cols-1 gap-2 place-content-center"
            >
              <div>
                <div class="flex flex-row h-6 space-x-2">
                  <h3>USDC</h3>
                  <usdc-icon class="w-6"></usdc-icon>
                </div>
                <div v-if="market_orders_buy_usdc.length">
                  <MarketOrders
                    :market_orders="market_orders_buy_usdc"
                    market_token="USDC"
                  />
                </div>
                <div v-else>
                  <grid-loader :color="'#ffa500'"></grid-loader>
                </div>
              </div>
              <div>
                <div class="flex flex-row h-6 space-x-2">
                  <h3>ATLAS</h3>
                  <atlas-icon class="w-6"></atlas-icon>
                </div>
                <div v-if="market_orders_buy_atlas.length">
                  <MarketOrders
                    :market_orders="market_orders_buy_atlas"
                    market_token="ATLAS"
                  />
                </div>
                <div v-else>
                  <grid-loader :color="'#ffa500'"></grid-loader>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="collapse collapse-arrow border border-base-300 bg-base-100">
          <input type="checkbox" class="peer" />
          <div class="collapse-title text-primary-content">
            <h2 class="">SELL Orders</h2>
          </div>
          <div class="collapse-content">
            <div
              class="bg-base-200 p-3 grid sm:grid-cols-2 grid-cols-1 gap-2 place-content-center"
            >
              <div class="basis-1/2">
                <div class="flex flex-row h-6 space-x-2">
                  <h3>USDC</h3>
                  <usdc-icon class="w-6"></usdc-icon>
                </div>
                <div v-if="market_orders_sell_usdc.length">
                  <MarketOrders
                    :market_orders="market_orders_sell_usdc"
                    market_token="USDC"
                  />
                </div>
                <div v-else>
                  <grid-loader :color="'#ffa500'"></grid-loader>
                </div>
              </div>
              <div class="basis-1/2">
                <div class="flex flex-row h-6 space-x-2">
                  <h3>ATLAS</h3>
                  <atlas-icon class="w-6"></atlas-icon>
                </div>
                <div v-if="market_orders_sell_atlas.length">
                  <MarketOrders
                    :market_orders="market_orders_sell_atlas"
                    market_token="ATLAS"
                  />
                </div>
                <div v-else>
                  <grid-loader :color="'#ffa500'"></grid-loader>
                </div>
              </div>
            </div>
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
import { use_staratlasStore } from "@/store/staratlas_store";
import GridLoader from "vue-spinner/src/GridLoader.vue";

import { Order } from "@staratlas/factory";
import { TOKEN_ATLAS, TOKEN_USDC } from "@/typescipt/const/tokens";
import MarketOrders from "@/components/table/components/MarketOrders.vue";
import UsdcIcon from "@/components/icons/USDCIcon.vue";
import AtlasIcon from "@/components/icons/ATLASIcon.vue";
import { staratlas_gmClientStore } from "@/store/staratlas_gmClient";
import OrderDepthChart from "@/components/charts/OrderDepthChart.vue";
import LineChart from "@/components/charts/LineChart.vue";
import CandleStickChart from "@/components/charts/CandleStickChart.vue";

const props = defineProps({
  mint_address: {
    type: String,
    default: null,
  },
});
const staratlas_gmClient = staratlas_gmClientStore();

let market_orders_buy_usdc = ref([] as Order[]);
let market_orders_buy_atlas = ref([] as Order[]);

let market_orders_sell_usdc = ref([] as Order[]);
let market_orders_sell_atlas = ref([] as Order[]);

async function load_order_data() {
  const market_orders: Order[] = staratlas_gmClient.orders.filter(
    (order) => order.orderMint === props.mint_address
  );

  const market_orders_buy = market_orders.filter((orders) =>
    JSON.stringify(orders.orderType).includes("buy")
  );

  market_orders_buy_usdc.value = market_orders_buy
    .filter((orders) => orders.currencyMint == TOKEN_USDC.toString())
    .sort((a, b) => b.price - a.price);

  market_orders_buy_atlas.value = market_orders_buy
    .filter((orders) => orders.currencyMint == TOKEN_ATLAS.toString())
    .sort((a, b) => b.price - a.price);

  const market_orders_sell = market_orders.filter((orders) =>
    JSON.stringify(orders.orderType).includes("sell")
  );

  market_orders_sell_usdc.value = market_orders_sell
    .filter((orders) => orders.currencyMint == TOKEN_USDC.toString())
    .sort((a, b) => a.price - b.price);

  market_orders_sell_atlas.value = market_orders_sell
    .filter((orders) => orders.currencyMint === TOKEN_ATLAS.toString())
    .sort((a, b) => a.price - b.price);
}

onMounted(async () => {
  await load_order_data();
});

watch(
  () => props.mint_address,
  async (value) => {
    await load_order_data();
  }
);
</script>
