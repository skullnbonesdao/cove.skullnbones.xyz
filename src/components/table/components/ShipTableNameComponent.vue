<template>
  <div class="flex flex-col">
    <div>{{ name }}</div>
    <div class="flex flex-row space-x-2">
      <span class="badge">Badge</span>
      <span class="badge">Badge</span>
      <span class="badge">Badge</span>
      <span class="badge">Badge</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  symbol: "ShipTableImageComponent",
};
</script>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  name: { type: String, default: "SHIPNAME" },
});
</script>
