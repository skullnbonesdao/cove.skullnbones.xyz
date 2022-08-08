<template>
  <div
    class="flex flex-row bg-base-200 hover:bg-base-100 shadow-md rounded-lg space-x-2 p-2"
  >
    <div class="item inline-flex items-baseline space-x-1">
      <usdc-icon class="self-center w-5 h-5 rounded-full"> </usdc-icon>
      <span>
        <strong> {{ format_number(vwap) }}</strong></span
      >
    </div>
    <div v-if="show_vwap_text" class="item divider divider-horizontal"></div>
    <div v-if="show_vwap_text" class="item w-full text-right pr-1">VWAP</div>
  </div>
</template>

<script lang="ts">
export default {
  name: "VwapElement",
};
</script>

<script setup lang="ts">
import { defineProps } from "vue";
import UsdcIcon from "@/components/icons/USDCIcon.vue";

defineProps({
  vwap: {
    type: Number,
    default: 0,
  },
  show_vwap_text: {
    type: Boolean,
    default: true,
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
