<template></template>

<script>
import { onMounted, onUpdated, onUnmounted } from "vue";
import { themeChange } from "theme-change";

export default {
  symbol: "ThemeToggle",
  setup() {
    onMounted(() => {
      themeChange(false);
    });
  },
};
</script>

<style scoped></style>
