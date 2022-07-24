<template>
  <span
    class="badge border-transparent lowercase text-slate-200"
    v-bind:class="
      ' ' +
      (text === 'common' ? 'bg-gray-500' : '') +
      (text === 'uncommon' ? 'bg-green-700' : '') +
      (text === 'rare' ? 'bg-blue-700' : '') +
      (text === 'epic' ? 'bg-purple-700' : '') +
      (text === 'legendary' ? 'bg-yellow-600' : '') +
      (text === 'anomaly' ? 'bg-orange-600' : '')
    "
    >{{ text }}</span
  >
</template>

<script lang="ts">
export default {
  name: "RarityBadge",
};
</script>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  text: { type: String, default: "none" },
});
</script>

<style scoped></style>
