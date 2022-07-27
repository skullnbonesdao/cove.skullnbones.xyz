<template>
  <div class="flex flex-col ring-2 rounded-xl p-2">
    <h3 class="text-center">{{ asset_name }}</h3>
    <div class="flex flex-row space-x-2">
      <usdc-icon></usdc-icon>
      <h4>{{ asset_price }}</h4>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "PriceTicker",
};
</script>

<script setup lang="ts">
import { defineProps, ref, watch } from "vue";
import UsdcIcon from "@/components/icons/USDCIcon.vue";

const color = ref("yellow");

const props = defineProps({
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
