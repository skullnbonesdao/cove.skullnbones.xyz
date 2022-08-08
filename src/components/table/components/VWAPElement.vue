<template>
  <div
    class="flex flex-row w-full bg-base-200 hover:bg-base-100 shadow-md rounded-lg space-x-2 p-2"
  >
    <div class="item inline-flex items-baseline space-x-2 w-full">
      <usdc-icon class="self-center w-5 h-5 rounded-full"> </usdc-icon>
      <span class="font-bold">
        {{ format_number(vwap) }}
      </span>
    </div>

    <div v-if="show_vwap_text" class="item divider divider-horizontal"></div>
    <div v-if="show_vwap_text" class="item w-fulltext-right pr-1">VWAP</div>
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
import { format_number } from "@/typescipt/helper/format_number";

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
</script>

<style scoped></style>
