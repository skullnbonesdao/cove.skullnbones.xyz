<template>
  <div class="p-4 bg-base-100 rounded-xl" v-if="assets?.media">
    <div class="grid grid-cols-10 md:grid-cols-12 justify-center py-2 gap-2">
      <a
        :href="'#item' + id + 1"
        class="btn btn-sm"
        v-for="(image, id) in assets?.media.gallery"
        :key="image"
        >{{ id + 1 }}</a
      >
    </div>
    <div class="carousel">
      <div
        :id="'item' + id + 1"
        class="carousel-item w-full max-h-96 justify-center"
        v-for="(image, id) in assets?.media.gallery"
        :key="image"
      >
        <img alt="sa_image" :src="image" class="object-scale-down" />
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
import { ref, defineProps, onMounted, watch } from "vue";
import { use_staratlasStore } from "@/store/staratlas_store";
import { StarAtlasNFT } from "@/typescipt/interfaces/StarAtlasNFT";

const staratlas_data = use_staratlasStore();
const props = defineProps({
  mint_address: {
    type: String,
    default: "",
  },
});

let assets = ref({} as StarAtlasNFT | undefined);

function load_image_data() {
  assets.value = staratlas_data.nfts.find(
    (nft) => nft.mint === props.mint_address
  );
}

onMounted(() => {
  load_image_data();
});

watch(
  () => props.mint_address,
  () => {
    load_image_data();
  }
);
</script>

<style scoped></style>
