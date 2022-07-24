<template>
  <div class="flex flex-row">
    <div class="flex flex-col items-center">
      <div class="avatar">
        <div class="w-12 mask mask-hexagon">
          <img class="rounded-md" :src="img_url" alt="asset_image" />
        </div>
      </div>
      <div class="absolute bottom-0 pb-1">
        <div class="badge">{{ symbol }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  symbol: "ShipTableImageComponent",
};
</script>

<script setup lang="ts">
import { defineProps } from "vue";

defineProps({
  symbol: { type: String, default: "" },
  img_url: {
    type: String,
    default:
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.NoU3q4AEZO6bFNhD4RerAQHaE9%26pid%3DApi&f=1",
  },
});
</script>
