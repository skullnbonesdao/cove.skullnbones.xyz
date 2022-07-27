<template>
  <div class="p-4 bg-base-100 rounded-xl" v-if="assets?.media">
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
import { ref, defineProps, onMounted, watch } from "vue";
import { staratlasStore } from "@/store/staratlas_store";
import { StarAtlasNFT } from "@/typescipt/interfaces/staratlasnft";

const staratlas_data = staratlasStore();
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
  (value) => {
    load_image_data();
  }
);
</script>

<style scoped></style>
