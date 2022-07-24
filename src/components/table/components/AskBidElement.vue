<template>
  <div class="flex flex-row space-x-1">
    <usdc-icon></usdc-icon>
    <div class="w-32 text-right">
      {{ (price_usdc * Math.pow(10, -6)).toFixed(2) }}
    </div>
    <percentage-element
      :price_vwap="vwap"
      :is_price="price_usdc * Math.pow(10, -6)"
    ></percentage-element>
  </div>
  <div class="flex flex-row space-x-1">
    <atlas-icon></atlas-icon>
    <div class="w-32 text-right">
      {{ (price_atlas * Math.pow(10, -8)).toFixed(2) }}
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "AskBidElement",
};
</script>

<script setup lang="ts">
import { ref, defineProps, onMounted } from "vue";

import { staratlasStore } from "@/store/staratlas_store";
import { staratlasFactory } from "@/store/staratlas_factory";
import { OrderAccountItem } from "@staratlas/factory";
import { TOKEN_ATLAS, TOKEN_USDC } from "@/typescipt/const/tokens";
import UsdcIcon from "@/components/icons/USDCIcon.vue";
import AtlasIcon from "@/components/icons/ATLASIcon.vue";
import PercentageElement from "@/components/special/PercentageElement.vue";

const props = defineProps({
  mint_address: { type: String, default: null },
  side: { type: String, default: "" },
  vwap: { type: Number, default: 0 },
});

const staratlas_factory = staratlasFactory();

let price_usdc = ref(0);
let price_atlas = ref(0);

async function load_order_data() {
  const market_orders: OrderAccountItem[] =
    await staratlas_factory.getOpenOrdersForAsset(props.mint_address);

  const marker_orders_side = market_orders?.filter((orders) =>
    JSON.stringify(orders.account.orderSide).includes(props.side)
  );
  if (marker_orders_side.length > 0) {
    switch (props.side) {
      case "buy": {
        price_usdc.value = marker_orders_side
          ?.filter(
            (order) =>
              order.account.currencyMint.toBase58() == TOKEN_USDC.toBase58()
          )
          ?.sort((a, b) => b.account.price - a.account.price)[0].account.price;
        price_atlas.value = marker_orders_side
          ?.filter(
            (order) =>
              order.account.currencyMint.toBase58() == TOKEN_ATLAS.toBase58()
          )
          ?.sort((a, b) => b.account.price - a.account.price)[0].account.price;
        break;
      }
      case "sell": {
        price_usdc.value = marker_orders_side
          ?.filter(
            (order) =>
              order.account.currencyMint.toBase58() == TOKEN_USDC.toBase58()
          )
          ?.sort((a, b) => a.account.price - b.account.price)[0].account.price;
        price_atlas.value = marker_orders_side
          ?.filter(
            (order) =>
              order.account.currencyMint.toBase58() == TOKEN_ATLAS.toBase58()
          )
          ?.sort((a, b) => a.account.price - b.account.price)[0].account.price;
        break;
      }
    }
  }
}

onMounted(async () => {
  await load_order_data();
});
</script>

<style scoped></style>
