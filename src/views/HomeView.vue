<template>
  <div class="home">
    <home-component></home-component>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeComponent from "@/components/HomeComponent.vue"; // @ is an alias to /src

export default defineComponent({
  symbol: "HomeView",
  components: {
    HomeComponent,
  },
});
</script>
