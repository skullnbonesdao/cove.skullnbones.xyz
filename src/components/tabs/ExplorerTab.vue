<template>
  <div>
    <h1 class="text-center">Explorer</h1>
  </div>
</template>

<script lang="ts">
export default {
  name: "ExplorerTab",
};
</script>

<script setup lang="ts">
import { defineProps } from "vue";
import { staratlasStore } from "@/store/staratlas_store";
import { StarAtlasNFT } from "@/typescipt/interfaces/staratlasnft";

const staratlas_data = staratlasStore();
const props = defineProps({
  mint_address: {
    type: String,
    default: "",
  },
});
</script>

<style scoped></style>
