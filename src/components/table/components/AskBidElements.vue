<template>
  <!-- USDC -->
  <div class="flex flex-col space-y-1">
    <div class="flex flex-row space-x-1">
      <div class="grow"></div>
      <usdc-icon class="w-6"></usdc-icon>
      <div v-if="price_usdc === 0">
        <beat-loader :color="'#ffa500'"></beat-loader>
      </div>
      <div v-else>
        <div v-if="price_usdc !== -1" class="flex flex-row space-x-2">
          <div class="w-24 text-right">
            {{ price_usdc.toFixed(2) }}
          </div>
          <percentage-element
            class="w-13 text-right"
            :price_vwap="vwap"
            :is_price="price_usdc"
          ></percentage-element>
        </div>
        <div v-else class="flex flex-row space-x-2">
          <div class="w-24 text-right">no-market</div>
          <percentage-element
            class="w-13 text-right"
            :price_vwap="vwap"
            :is_price="price_usdc"
          ></percentage-element>
        </div>
      </div>
    </div>

    <!-- ATLAS -->
    <div class="flex flex-row space-x-1">
      <div class="grow"></div>
      <atlas-icon class="w-6"></atlas-icon>
      <div v-if="price_atlas === 0">
        <beat-loader :color="'#ffa500'"></beat-loader>
      </div>
      <div v-else>
        <div v-if="price_atlas !== -1" class="flex flex-row space-x-2">
          <div class="w-24 text-right">
            {{ price_atlas.toFixed(2) }}
          </div>

          <percentage-element
            class="w-13 text-right"
            :price_vwap="vwap"
            :is_price="price_atlas * parseFloat(tokenWS.m_atlas)"
          ></percentage-element>
        </div>
        <div v-else class="flex flex-row space-x-2">
          <div class="w-24 text-right">no-market</div>
          <percentage-element
            class="w-13 text-right"
            :price_vwap="vwap"
            :is_price="price_atlas * parseFloat(tokenWS.m_atlas)"
          ></percentage-element>
        </div>
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
</script>

<style scoped></style>
