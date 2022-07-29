<template>
  <div
    v-if="price === 0"
    class="flex flex-row bg-base-200 hover:bg-base-100 shadow-md rounded-lg space-x-2 p-2 h-10"
  >
    <beat-loader :color="'#ffa500'"></beat-loader>
  </div>
  <div v-else class="flex flex-row rounded-lg space-x-2 p-2 h-10">
    <atlas-icon v-if="currency === 'atlas'" class="item"></atlas-icon>
    <usdc-icon v-else class="item"> </usdc-icon>
    <div class="item divider divider-horizontal"></div>
    <div class="item">
      <percentage-element
        class="item w-16"
        v-if="show_percentage && currency === 'atlas'"
        :no_market="price === -1"
        :is_price="price * tokenWS.m_atlas"
        :price_vwap="vwap"
      ></percentage-element>
      <percentage-element
        class="item w-16"
        v-else-if="show_percentage && currency === 'usdc'"
        :no_market="price === -1"
        :is_price="price"
        :price_vwap="vwap"
      ></percentage-element>
      <div v-else>{{ price === -1 ? "-" : price.toFixed(2) }}</div>
    </div>
    <div v-if="text.length" class="item">{{ text }}</div>
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
    default: "",
  },
  currency: {
    type: String,
    default: "usdc",
  },
  vwap: {
    type: Number,
    default: 0,
  },
  show_percentage: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped></style>
