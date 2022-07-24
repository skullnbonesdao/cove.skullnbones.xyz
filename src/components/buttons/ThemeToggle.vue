<template>
  <button
    class="btn btn-primary btn-circle"
    checked
    data-toggle-theme="dark,light"
    data-act-class="ACTIVECLASS"
  >
    <i class="bi bi-brightness-high text-xl"></i>
  </button>
</template>

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
