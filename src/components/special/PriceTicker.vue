<template>
  <div class="flex flex-col text-center">
    <h3>{{ asset_name }}</h3>
    <h4>{{ asset_price }}</h4>
  </div>
</template>

<script lang="ts">
export default {
  name: "PriceTicker",
};
</script>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  asset_name: {
    type: String,
    default: "ASSET",
  },
  asset_price: {
    type: String,
    default: "0.0",
  },
});
</script>

<style scoped></style>
