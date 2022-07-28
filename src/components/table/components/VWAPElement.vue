<template>
  <div
    class="flex flex-row bg-base-200 hover:bg-base-100 shadow-md rounded-lg space-x-2 p-2"
  >
    <div class="item w-10">
      <usdc-icon></usdc-icon>
    </div>
    <div class="item text-right">
      <strong> {{ vwap }}</strong>
    </div>
    <div class="divider divider-horizontal"></div>
    <div class="item w-full text-center">VWAP</div>
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
