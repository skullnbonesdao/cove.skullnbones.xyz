<template>
  <div
    :class="
      is_price === 0.0
        ? 'text-yellow-500'
        : calculatesPercentage > 0
        ? 'text-green-500'
        : 'text-red-500'
    "
  >
    {{ calculatesPercentage().toFixed(1) }}%
  </div>
</template>

<script lang="ts">
export default {
  name: "PercentageElement",
};
</script>
<script setup lang="ts">
import { ref, defineProps, watch } from "vue";

const props = defineProps({
  price_vwap: { type: Number, default: 0 },
  is_price: { type: Number, default: 0 },
});

function calculatesPercentage(): number {
  if (props.is_price === 0) {
    return 0;
  }
  if (props.price_vwap > props.is_price) {
    return -(1 - props.is_price / props.price_vwap) * 100;
  }
  if (props.price_vwap <= props.is_price) {
    return (props.is_price / props.price_vwap - 1) * 100;
  }
  return 0;
}
</script>
<style scoped></style>
