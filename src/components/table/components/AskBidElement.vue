<template>
  <!-- USDC -->
  <div class="flex flex-row space-x-1">
    <usdc-icon class="basis-1/5"></usdc-icon>
    <div class="basis-2/5 text-right">
      {{ price_usdc }}
    </div>
    <percentage-element
      class="basis-1/5 text-right"
      :price_vwap="vwap"
      :is_price="price_usdc"
    ></percentage-element>
    <div class="basis-1/5"></div>
  </div>

  <!-- ATLAS -->
  <div class="flex flex-row space-x-1">
    <atlas-icon class="basis-1/5"></atlas-icon>
    <div class="basis-2/5 text-right">
      {{ price_atlas }}
    </div>
    <percentage-element
      class="basis-1/5 text-right"
      :price_vwap="vwap"
      :is_price="0.0"
    ></percentage-element>
    <div class="basis-1/5"></div>
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

const props = defineProps({
  vwap: { type: Number, default: 0 },
  price_atlas: { type: Number, default: 0 },
  price_usdc: { type: Number, default: undefined },
});
</script>

<style scoped></style>
