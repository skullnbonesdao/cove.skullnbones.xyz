<template>
  <button
    class="btn btn-primary btn-circle"
    checked
    data-toggle-theme="dark,light"
    data-act-class="data-theme"
  >
    <i class="bi bi-brightness-high text-xl"></i>
  </button>
</template>

<script>
import { onMounted } from "vue";
import { themeChange } from "theme-change";

export default {
  symbol: "ThemeToggle",
  setup() {
    onMounted(() => {
      themeChange(false);
    });
  },
  methods: {
    switch_theme() {
      console.info("switching-theme");
      let theme_state = document
        .getElementsByTagName("html")
        .item(0)
        .getAttribute("data-theme");

      if (theme_state === "dark") {
        localStorage.theme = "light";
      }
      if (theme_state === "light") {
        localStorage.theme = "dark";
      }
    },
  },
};
</script>

<style scoped></style>
