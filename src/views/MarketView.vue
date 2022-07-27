<template>
  <div class="flex flex-col w-full border-opacity-50 p-4">
    <div
      class="grid px-16 card bg-base-300 rounded-box place-items-center space-y-2"
    >
      <h1>Market</h1>
      <div class="grid md:grid-cols-4 gap-10 pb-2">
        <price-ticker
          asset_name="BTC/USDC"
          :asset_price="tokenWS.m_btc"
        ></price-ticker>
        <price-ticker
          asset_name="SOL/USDC"
          :asset_price="tokenWS.m_sol"
        ></price-ticker>
        <price-ticker
          asset_name="POLIS/USDC"
          :asset_price="tokenWS.m_polis"
        ></price-ticker>
        <price-ticker
          asset_name="ATLAS/USDC"
          :asset_price="tokenWS.m_atlas"
        ></price-ticker>
      </div>
    </div>

    <div class="divider"></div>
    <div class="bg-base-300 rounded-box place-items-center">
      <div v-if="staratlas_store.status === 'fetched'">
        <ship-table :assets="staratlas_store.nfts"></ship-table>
      </div>
      <div v-else class="grid place-items-center">
        <grid-loader :color="'#ffa500'"></grid-loader>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  symbol: "MarketView",
};
</script>

<script setup lang="ts">
import { defineComponent, onBeforeMount, onMounted } from "vue";
import ShipTable from "@/components/table/ShipTable.vue";
import { staratlasStore } from "@/store/staratlas_store";
import { tokenPricesWebsocket } from "@/store/token_price_websocket";
import GridLoader from "vue-spinner/src/GridLoader.vue";
import PriceTicker from "@/components/special/PriceTicker.vue";

const staratlas_store = staratlasStore();
const tokenWS = tokenPricesWebsocket();
tokenWS.initMarkets();

onMounted(async () => {
  await staratlas_store.fetchFullData();
});
</script>

<style scoped></style>
