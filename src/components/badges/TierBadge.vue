<template>
  <span
    class="badge border-transparent text-black"
    v-bind:class="
      ' ' +
      (text === 0 ? 'gold' : '') +
      (text === 1 ? 'silver' : '') +
      (text === 2 ? 'bronze' : '')
    "
    >GAO {{ text }}</span
  >
</template>

<script lang="ts">
export default {
  name: "TierBadge",
};
</script>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  text: { type: Number, default: -1 },
});
</script>

<style scoped>
.gold {
  background-color: #fcc200;
}
.silver {
  background-color: #a6a6a6;
}
.bronze {
  background-color: #cd7f32;
}
</style>
