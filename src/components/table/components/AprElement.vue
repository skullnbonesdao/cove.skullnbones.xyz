<template>
  <div
    v-if="apr_value === -1"
    class="flex flex-row bg-base-200 hover:bg-base-100 shadow-md rounded-lg space-x-2 p-2 h-10"
  >
    <beat-loader :color="'#ffa500'"></beat-loader>
  </div>
  <div v-else-if="apr_value === 0" class="text-right">-</div>
  <div v-else class="text-right">{{ apr_value.toFixed(2) }}%</div>
</template>

<script lang="ts">
export default {
  name: "AprElement",
};
</script>

<script setup lang="ts">
import { defineProps } from "vue";
import BeatLoader from "vue-spinner/src/BeatLoader.vue";

defineProps({
  apr_value: {
    type: Number,
    default: 0,
  },
});
</script>

<style scoped></style>
