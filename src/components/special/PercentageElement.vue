<template>
  <div
    :class="
      is_price === 0.0 || no_market
        ? 'text-yellow-500'
        : calculatesPercentageVWAPvsMarket(
            price_vwap,
            is_price,
            no_market
          ).toFixed(1) > 0
        ? 'text-green-500'
        : 'text-red-500'
    "
  >
    {{
      calculatesPercentageVWAPvsMarket(price_vwap, is_price, no_market).toFixed(
        1
      )
    }}%
  </div>
</template>

<script lang="ts">
export default {
  name: "PercentageElement",
};
</script>
<script setup lang="ts">
import { ref, defineProps, watch } from "vue";
import { calculatesPercentageVWAPvsMarket } from "@/typescipt/helper/calculate_market";

const props = defineProps({
  price_vwap: { type: Number, default: 0 },
  is_price: { type: Number, default: 0 },
  no_market: { type: Boolean, default: false },
});
</script>
<style scoped></style>
