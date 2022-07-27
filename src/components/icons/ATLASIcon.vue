<template>
  <div class="self-center w-5 h-5 rounded-full mx-1">
    <img
      class="invertible"
      alt="usdc_icon"
      src="@/components/icons/ICON_ATLAS.webp"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: "AtlasIcon",
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
