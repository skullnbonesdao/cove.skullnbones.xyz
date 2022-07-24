<template>
  <nav-bar></nav-bar>
</template>

<script lang="ts">
import NavBar from "@/router/NavBar.vue";
export default {
  components: { NavBar },
};
</script>

<script setup lang="ts">
import { staratlasFactory } from "@/store/staratlas_factory";

const staratlas_factory = staratlasFactory();

staratlas_factory.init();
</script>
