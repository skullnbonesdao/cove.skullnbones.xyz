<template>
  <div class="flex flex-col w-full border-opacity-50 p-4">
    <div class="grid px-16 card bg-base-300 rounded-box place-items-center">
      <h1>Market</h1>
      <div>-Ticker-</div>
    </div>

    <div class="divider"></div>
    <div class="bg-base-300 rounded-box place-items-center">
      <ship-table :assets="staratlas_store.nfts"></ship-table>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  symbol: "MarketView",
};
</script>

<script setup lang="ts">
import { onBeforeMount, onMounted } from "vue";
import ShipTable from "@/components/table/ShipTable.vue";
import { staratlasStore } from "@/store/staratlas_store";
import { staratlas_gmClientStore } from "@/store/staratlas_gmClient";

const staratlas_store = staratlasStore();

onBeforeMount(async () => {
  await staratlas_store.fetchFullData();

  //gmOrderBookService.init();
  //await staratlas_factory.getOpenOrdersForAsset_all(staratlas_store.nfts);
  //await staratlas_factory.getScoreVarsShipInfo_all(staratlas_store.nfts);
});
</script>

<style scoped></style>
