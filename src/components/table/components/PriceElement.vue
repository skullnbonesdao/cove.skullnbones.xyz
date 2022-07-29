<template>
  <div
    v-if="price === 0"
    class="flex flex-row bg-base-200 hover:bg-base-100 shadow-md rounded-lg space-x-2 p-2 h-10"
  >
    <beat-loader :color="'#ffa500'"></beat-loader>
  </div>
  <div
    v-else
    class="flex flex-row bg-base-200 hover:bg-base-100 shadow-md rounded-lg space-x-2 p-2 h-10"
  >
    <atlas-icon v-if="currency === 'atlas'" class="item"></atlas-icon>
    <usdc-icon v-else class="item"> </usdc-icon>

    <div class="item text-right w-full">
      <strong> {{ price === -1 ? "no-market" : price.toFixed(2) }}</strong>
    </div>
    <div class="item divider divider-horizontal"></div>
    <div v-if="text" class="item pr-1 text-center">{{ text }}</div>
    <percentage-element
      v-else-if="currency === 'atlas'"
      :is_price="price * parseFloat(tokenWS.m_atlas)"
      :price_vwap="vwap"
      :no_market="price === -1"
    ></percentage-element>
    <percentage-element
      v-else
      :is_price="price"
      :price_vwap="vwap"
      :no_market="price === -1"
    ></percentage-element>
  </div>
</template>

<script lang="ts">
export default {
  name: "PriceElement",
};
</script>

<script setup lang="ts">
import { defineProps } from "vue";
import UsdcIcon from "@/components/icons/USDCIcon.vue";
import AtlasIcon from "@/components/icons/ATLASIcon.vue";
import PercentageElement from "@/components/special/PercentageElement.vue";
import BeatLoader from "vue-spinner/src/BeatLoader.vue";
import { tokenPricesWebsocket } from "@/store/token_price_websocket";

const tokenWS = tokenPricesWebsocket();

defineProps({
  price: {
    type: Number,
    default: 0,
  },
  text: {
    type: String,
    default: "none",
  },
  currency: {
    type: String,
    default: "usdc",
  },
  vwap: {
    type: Number,
    default: 0,
  },
});
</script>

<style scoped></style>
