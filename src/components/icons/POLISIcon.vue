<template>
  <img
    class="invertible"
    alt="usdc_icon"
    src="@/components/icons/ICON_POLIS.webp"
  />
</template>

<script lang="ts">
export default {
  name: "PolisIcon",
};
</script>

<script setup lang="ts">
import { defineProps } from "vue";

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

<style scoped>
[data-theme="dark"] .invertible {
  filter: invert(1);
}
</style>
