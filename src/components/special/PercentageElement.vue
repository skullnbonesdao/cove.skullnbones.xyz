<template>
  <div
    :class="
      percentage === 0
        ? 'text-yellow-500'
        : percentage > 0
        ? 'text-green-500'
        : 'text-red-500'
    "
  >
    {{ percentage.toFixed(1) }}%
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

let percentage = ref(0.0);

function calculatesPercentage() {
  if (props.price_vwap > props.is_price) {
    percentage.value = -(1 - props.is_price / props.price_vwap) * 100;
  }
  if (props.price_vwap <= props.is_price) {
    percentage.value = (props.is_price / props.price_vwap - 1) * 100;
  }
}

watch(
  () => props.is_price,
  (value) => {
    calculatesPercentage();
  }
);
</script>
<style scoped></style>
