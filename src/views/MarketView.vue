<template>
  <div class="flex flex-col w-full border-opacity-50 p-4">
    <div class="grid px-16 card bg-base-300 rounded-box place-items-center">
      <h1>Market</h1>
      <div></div>
    </div>

    <div class="divider"></div>
    <div class="bg-base-300 rounded-box place-items-center">
      <ship-table class="" :assets="staratlas_data.nfts"></ship-table>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  symbol: "MarketView",
};
</script>

<script setup lang="ts">
import { staratlasStore } from "@/store/staratlas_store";

import { onMounted } from "vue";
import ShipTable from "@/components/table/ShipTable.vue";

const staratlas_data = staratlasStore();
onMounted(async () => {
  await staratlas_data.fetchFullData();
});
</script>

<style scoped></style>
