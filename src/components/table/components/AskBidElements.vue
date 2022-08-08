<template>
  <div
    class="flex flex-col bg-base-200 hover:bg-base-100 shadow-md rounded-lg space-y-1 p-2"
  >
    <div class="item w-auto">
      <div v-if="price_usdc === 0">
        <beat-loader :color="'#ffa500'"></beat-loader>
      </div>
      <div v-else class="item inline-flex items-baseline space-x-2 w-full">
        <usdc-icon class="self-center w-5 h-5"> </usdc-icon>
        <span v-if="price_usdc === -1" class="item w-full text-right">-</span>
        <span v-else class="item w-full text-right">
          {{ format_number(price_usdc) }}
          <percentage-element
            v-if="vwap"
            class=""
            :price_vwap="vwap"
            :is_price="price_usdc !== -1 ? price_usdc : 0"
          ></percentage-element>
        </span>
      </div>
    </div>
    <div class="divider"></div>
    <div class="item w-auto">
      <div v-if="price_atlas === 0">
        <beat-loader :color="'#ffa500'"></beat-loader>
      </div>
      <div v-else class="item inline-flex items-baseline space-x-2 w-full">
        <atlas-icon class="self-center w-5 h-5"></atlas-icon>
        <div v-if="price_atlas === -1" class="item w-full text-right">-</div>
        <span v-else class="item w-full text-right">
          {{ format_number(price_atlas) }}
          <percentage-element
            v-if="vwap"
            class=""
            :price_vwap="vwap"
            :no_market="vwap === 0"
            :is_price="
              price_atlas !== -1 ? price_atlas * parseFloat(tokenWS.m_atlas) : 0
            "
          ></percentage-element>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "AskBidElements",
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

const props = defineProps({
  vwap: { type: Number, default: 0 },
  price_atlas: { type: Number, default: 0 },
  price_usdc: { type: Number, default: 0 },
});

function format_number(number: number): string {
  if (number >= 1000) {
    const num_parts = number.toFixed(2).split(".");
    return (num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","));
  } else return number.toFixed(2);
}
</script>

<style scoped></style>
