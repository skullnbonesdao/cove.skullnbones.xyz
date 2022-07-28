<template>
  <div
    class="flex flex-row bg-base-200 hover:bg-base-100 shadow-md rounded-lg space-x-2 p-2"
  >
    <div class="item w-6">
      <usdc-icon class=""> </usdc-icon>
    </div>

    <div class="item text-right w-24">
      <strong> {{ vwap }}</strong>
    </div>
    <div class="item divider divider-horizontal"></div>
    <div class="item text-center">VWAP</div>
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
});
</script>

<style scoped></style>
