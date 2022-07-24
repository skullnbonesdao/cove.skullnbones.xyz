<template>
  <div class="p-4 bg-base-100">
    <div class="flex justify-center py-2 gap-2">
      <a
        :href="'#item' + id"
        class="btn btn-sm"
        v-for="(image, id) in assets?.media.gallery"
        :key="image"
        >{{ id }}</a
      >
    </div>
    <div class="carousel">
      <div
        :id="'item' + id"
        class="carousel-item w-full max-h-96 justify-center"
        v-for="(image, id) in assets?.media.gallery"
        :key="image"
      >
        <img alt="sa_image" :src="image" class="object-cover" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ImagesTab",
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

const assets: StarAtlasNFT | undefined = staratlas_data.nfts.find(
  (nft) => nft.mint === props.mint_address
);
</script>

<style scoped></style>
