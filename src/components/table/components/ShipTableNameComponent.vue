<template>
  <div class="flex flex-col">
    <h3>{{ ship.name }}</h3>
    <div
      v-if="!disable_badges"
      class="flex md:flex-row flex-col md:space-x-2 md:space-y-0 space-y-1"
    >
      <tier-badge :text="ship?.attributes.tier || 0"></tier-badge>
      <rarity-badge :text="ship?.attributes.rarity"></rarity-badge>
      <class-badge :text="ship?.attributes.class"></class-badge>
      <span v-if="ship?.attributes.spec" class="badge">{{
        ship?.attributes.spec
      }}</span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  symbol: "ShipTableImageComponent",
};
</script>

<script setup lang="ts">
import { defineProps, watch } from "vue";
import { use_staratlasStore } from "@/store/staratlas_store";
import { StarAtlasNFT } from "@/typescipt/interfaces/StarAtlasNFT";
import RarityBadge from "@/components/badges/RarityBadge.vue";
import TierBadge from "@/components/badges/TierBadge.vue";
import ClassBadge from "@/components/badges/ClassBadge.vue";

const staratlas_data = use_staratlasStore();

const props = defineProps({
  mint_address: {
    type: String,
    default: "",
  },
  disable_badges: {
    type: Boolean,
    default: false,
  },
});
const ship: StarAtlasNFT | undefined = staratlas_data.nfts.find(
  (assets) => assets.mint === props.mint_address
);

watch(props, () => {
  const ship: StarAtlasNFT | undefined = staratlas_data.nfts.find(
    (assets) => assets.mint === props.mint_address
  );
});
</script>
