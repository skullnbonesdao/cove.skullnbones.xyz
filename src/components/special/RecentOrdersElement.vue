<template>
  <div class="w-full bg-base-200 hover:bg-base-100 shadow-md rounded-lg p-2">
    <h4 class="text-center pt-2">Recent Trade</h4>
    <div class="divider h-0"></div>
    <div class="flex flex-col">
      <div class="item inline-flex items-baseline space-x-2">
        <usdc-icon class="self-center w-5 h-5 rounded-full"></usdc-icon>
        <span v-if="recent_trade_usdc" class="w-full text-right">
          {{ recent_trade_usdc === 0 ? "-" : recent_trade_usdc?.toFixed(2) }}
        </span>
      </div>
      <div class="item inline-flex items-baseline space-x-2">
        <atlas-icon class="self-center w-5 h-5 rounded-full"></atlas-icon>
        <span v-if="recent_trade_atlas" class="w-full text-right">
          {{ recent_trade_atlas === 0 ? "-" : recent_trade_atlas.toFixed(2) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "RecentOrdersElement",
};
</script>

<script setup lang="ts">
import { defineProps, onMounted, ref, watch } from "vue";
import UsdcIcon from "@/components/icons/USDCIcon.vue";
import AtlasIcon from "@/components/icons/ATLASIcon.vue";

const props = defineProps({
  mint_address: {
    type: String,
    default: undefined,
  },
});

const recent_trade_usdc = ref();
const recent_trade_atlas = ref();

onMounted(async () => {
  await load_recent_trades();
});

watch(
  () => props.mint_address,
  async (value) => {
    await load_recent_trades();
  }
);

async function load_recent_trades() {
  await fetch(
    "https://api.skullnbones.xyz/trades/" +
      props.mint_address +
      "/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
  )
    .then((res) => res.json())
    .then(
      (data) =>
        (recent_trade_usdc.value =
          data[0]?.seller_token ===
          "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
            ? (data[0]?.seller_amount *
                Math.pow(10, -data[0]?.seller_decimals)) /
              data[0]?.buyer_amount
            : data[0]?.buyer_token ===
              "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
            ? (data[0]?.buyer_amount * Math.pow(10, -data[0]?.buyer_decimals)) /
              data[0]?.seller_amount
            : 0)
    );

  await fetch(
    "https://api.skullnbones.xyz/trades/" +
      props.mint_address +
      "/ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx"
  )
    .then((res) => res.json())
    .then(
      (data) =>
        (recent_trade_atlas.value =
          data[0]?.seller_token ===
          "ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx"
            ? (data[0]?.seller_amount *
                Math.pow(10, -data[0]?.seller_decimals)) /
              data[0]?.buyer_amount
            : data[0]?.buyer_token ===
              "ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx"
            ? (data[0]?.buyer_amount * Math.pow(10, -data[0]?.buyer_decimals)) /
              data[0]?.seller_amount
            : 0)
    );
}
</script>

<style scoped></style>
