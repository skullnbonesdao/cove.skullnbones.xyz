<template>
  <div>
    <div class="card bg-base-100 shadow-2xl hover:bg-opacity-50">
      <figure class="pt-4">
        <img
          v-if="img_url !== '@/assets/images/image_placeholder.jpg'"
          :src="img_url"
          alt="NFT_view"
          class="h-52 object-contain rounded-md"
        />
        <img
          v-else
          src="@/assets/images/image_placeholder.jpg"
          alt="NFT_view"
          class="h-52 object-contain rounded-md"
        />
      </figure>
      <div class="p-2">
        <h2 class="text-xl">{{ name }}</h2>
        <a
          :href="'https://solscan.io/token/' + mint"
          target="_blank"
          rel="noopener noreferrer"
          class="link-info"
        >
          solscan.io</a
        >
        <p class="text-2xs">{{ mint }}</p>
        <div class="flex py-2 pr-2 justify-end">
          <button
            class="btn btn-warning hover:bg-opacity-50"
            @click="solana_burner.burnToken(mint)"
          >
            Burn 🔥
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "NftBurnerCard",
};
</script>

<script setup lang="ts">
import { defineProps, onMounted, toRefs } from "vue";
import { solana_burnerStore } from "@/store/solana_burnerStore";

const solana_burner = solana_burnerStore();

const props = defineProps({
  name: {
    type: String,
    default: "asset_name",
  },
  mint: {
    type: String,
    default: "mint_address",
  },
  img_url: {
    type: String,
    default: "@/assets/images/image_placeholder.jpg",
  },
});
</script>

<style scoped></style>
