<template>
  <div class="flex flex-col w-full border-opacity-50 p-4">
    <div class="grid px-16 card bg-base-300 rounded-box place-items-center">
      <h1>Market</h1>
      <div>-Ticker-</div>
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
import GridLoader from "vue-spinner/src/GridLoader.vue";

const staratlas_store = staratlasStore();

onMounted(async () => {
  await staratlas_store.fetchFullData();
});
</script>

<style scoped></style>
