<template>
  <span class="badge border-transparent lowercase">{{ text }}</span>
</template>

<script lang="ts">
export default {
  name: "ClassBadge",
};
</script>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  text: { type: String, default: "none" },
});
</script>

<style scoped></style>
