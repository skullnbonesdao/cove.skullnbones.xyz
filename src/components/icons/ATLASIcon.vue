<template>
  <div class="pt-1 pl-1">
    <img
      class="invertible"
      alt="usdc_icon"
      src="@/components/icons/ICON_ATLAS.webp"
      :width="width"
      :height="height"
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
