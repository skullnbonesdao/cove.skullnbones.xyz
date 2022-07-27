<template>
  <!-- USDC -->
  <div class="flex flex-row space-x-1">
    <usdc-icon></usdc-icon>
    <div v-if="price_usdc === 0">
      <beat-loader :color="'#ffa500'"></beat-loader>
    </div>
    <div v-else>
      <div v-if="price_usdc !== -1" class="flex flex-row space-x-2">
        <div class="w-32 text-right">
          {{ price_usdc }}
        </div>
        <percentage-element
          class="w-24 text-right"
          :price_vwap="vwap"
          :is_price="price_usdc"
        ></percentage-element>
      </div>
      <div v-else class="flex flex-row space-x-2">
        <div class="w-32 text-right">no-market</div>
        <percentage-element
          class="w-24 text-right"
          :price_vwap="vwap"
          :is_price="price_usdc"
        ></percentage-element>
      </div>
    </div>
  </div>

  <!-- ATLAS -->
  <div class="flex flex-row space-x-1">
    <atlas-icon></atlas-icon>
    <div v-if="price_atlas === 0">
      <beat-loader :color="'#ffa500'"></beat-loader>
    </div>
    <div v-else>
      <div v-if="price_atlas !== -1" class="flex flex-row space-x-2">
        <div class="w-32 text-right">
          {{ price_atlas }}
        </div>
        <percentage-element
          class="w-24 text-right"
          :price_vwap="vwap"
          :is_price="0.0"
        ></percentage-element>
      </div>
      <div v-else class="flex flex-row space-x-2">
        <div class="w-32 text-right">no-market</div>
        <percentage-element
          class="w-24 text-right"
          :price_vwap="vwap"
          :is_price="0.0"
        ></percentage-element>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "AskBidElement",
};
</script>

<script setup lang="ts">
import { ref, defineProps, onMounted, watch, PropType } from "vue";
import { staratlas_gmClientStore } from "@/store/staratlas_gmClient";
import { staratlasFactory } from "@/store/staratlas_factory";
import { TOKEN_ATLAS, TOKEN_USDC } from "@/typescipt/const/tokens";
import UsdcIcon from "@/components/icons/USDCIcon.vue";
import AtlasIcon from "@/components/icons/ATLASIcon.vue";
import PercentageElement from "@/components/special/PercentageElement.vue";
import BeatLoader from "vue-spinner/src/BeatLoader.vue";

const props = defineProps({
  vwap: { type: Number, default: 0 },
  price_atlas: { type: Number, default: 0 },
  price_usdc: { type: Number, default: undefined },
});
</script>

<style scoped></style>
