<template>
  <div
    class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4"
  >
    <div class="w-9">
      <btc-icon v-if="asset_name === 'BTC/USDC'"></btc-icon>
      <sol-icon v-else-if="asset_name === 'SOL/USDC'"> </sol-icon>
      <atlas-icon v-else-if="asset_name === 'ATLAS/USDC'"></atlas-icon>
      <polis-icon v-else-if="asset_name === 'POLIS/USDC'"></polis-icon>
      <usdc-icon v-else></usdc-icon>
    </div>
    <div>
      <h3>{{ asset_name }}</h3>
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
import BtcIcon from "@/components/icons/BTCIcon.vue";
import SolIcon from "@/components/icons/SOLIcon.vue";
import AtlasIcon from "@/components/icons/ATLASIcon.vue";
import PolisIcon from "@/components/icons/POLISIcon.vue";

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
