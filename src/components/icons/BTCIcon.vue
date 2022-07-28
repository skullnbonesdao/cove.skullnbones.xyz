<template>
  <img class="" alt="usdc_icon" src="@/components/icons/ICON_BTC.webp" />
</template>

<script lang="ts">
export default {
  name: "BtcIcon",
};
</script>

<script setup lang="ts">
import { defineComponent, defineProps } from "vue";

defineProps({
  width: {
    type: String,
    default: "15",
  },
  height: {
    type: String,
    default: "15",
  },
});
</script>

<style scoped></style>
