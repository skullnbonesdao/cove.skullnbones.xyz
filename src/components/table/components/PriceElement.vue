<template>
  <div
    v-if="price === 0"
    class="flex flex-row bg-base-200 hover:bg-base-100 shadow-md rounded-lg space-x-2 p-2 h-10"
  >
    <beat-loader :color="'#ffa500'"></beat-loader>
  </div>
  <div v-else class="flex flex-row rounded-lg space-x-1">
    <div class="item w-4">
      <atlas-icon v-if="currency === 'atlas'" class="item"></atlas-icon>
      <usdc-icon v-else class="item"> </usdc-icon>
    </div>
    <div class="item divider divider-horizontal"></div>
    <div class="item">
      <percentage-element
        class="item"
        v-if="show_percentage && currency === 'atlas'"
        :no_market="price === -1 || !vwap"
        :is_price="price * tokenWS.m_atlas"
        :price_vwap="vwap"
      ></percentage-element>
      <percentage-element
        class="item"
        v-else-if="show_percentage && currency === 'usdc'"
        :no_market="price === -1 || !vwap"
        :is_price="price"
        :price_vwap="vwap"
      ></percentage-element>
      <strong v-else class="item">
        {{ price === -1 ? "-" : format_number(price) }}
      </strong>
    </div>
    <div v-if="text.length" class="item text-right">{{ text }}</div>
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

function format_number(number: number): string {
  if (number >= 1000) {
    const num_parts = number.toFixed(2).split(".");
    return (num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  } else return number.toFixed(2);
}
</script>

<style scoped></style>
