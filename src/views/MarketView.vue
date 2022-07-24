<template>
  <h1>Market</h1>
  <ship-table :assets="staratlas_data.nfts"></ship-table>
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
