<template>
  <div class="flex flex-row space-x-1">
    <usdc-icon class="basis-1/4"></usdc-icon>
    <div class="basis-1/3 text-right">
      {{ (get_price_from_store_usdc() * Math.pow(10, -6)).toFixed(2) }}
    </div>
    <percentage-element
      class="basis-1/3 text-right"
      :price_vwap="vwap"
      :is_price="get_price_from_store_usdc() * Math.pow(10, -6)"
    ></percentage-element>
    <div class="w-full"></div>
  </div>
  <div class="flex flex-row space-x-1">
    <atlas-icon class="basis-1/4"></atlas-icon>
    <div class="basis-1/3 text-right">
      {{ (get_price_from_store_atlas() * Math.pow(10, -8)).toFixed(2) }}
    </div>
    <percentage-element
      class="basis-1/3 text-right"
      :price_vwap="vwap"
      :is_price="0.0"
    ></percentage-element>
    <div class="w-full"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: "AskBidElement",
};
</script>

<script setup lang="ts">
import { ref, defineProps, onMounted, watch } from "vue";

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

function get_price_from_store_atlas() {
  const market_orders: OrderAccountItem[] | undefined =
    staratlas_factory.order_account_item_assets?.find(
      (order) => order.mint_address === props.mint_address
    )?.orders;

  const marker_orders_side = market_orders?.filter((orders) =>
    JSON.stringify(orders.account.orderSide).includes(props.side)
  );

  if (marker_orders_side != undefined) {
    switch (props.side) {
      case "buy": {
        return marker_orders_side
          ?.filter(
            (order) =>
              order.account.currencyMint.toBase58() == TOKEN_ATLAS.toBase58()
          )
          ?.sort((a, b) => b.account.price - a.account.price)[0]?.account.price;
      }
      case "sell": {
        return marker_orders_side
          ?.filter(
            (order) =>
              order.account.currencyMint.toBase58() == TOKEN_ATLAS.toBase58()
          )
          ?.sort((a, b) => a.account.price - b.account.price)[0]?.account.price;
      }
    }
  }
}

function get_price_from_store_usdc() {
  const market_orders: OrderAccountItem[] | undefined =
    staratlas_factory.order_account_item_assets?.find(
      (order) => order.mint_address === props.mint_address
    )?.orders;

  const marker_orders_side = market_orders?.filter((orders) =>
    JSON.stringify(orders.account.orderSide).includes(props.side)
  );

  if (marker_orders_side != undefined) {
    switch (props.side) {
      case "buy": {
        return marker_orders_side
          ?.filter(
            (order) =>
              order.account.currencyMint.toBase58() == TOKEN_USDC.toBase58()
          )
          ?.sort((a, b) => b.account.price - a.account.price)[0]?.account.price;
      }
      case "sell": {
        return marker_orders_side
          ?.filter(
            (order) =>
              order.account.currencyMint.toBase58() == TOKEN_USDC.toBase58()
          )
          ?.sort((a, b) => a.account.price - b.account.price)[0]?.account.price;
      }
    }
  }
}
</script>

<style scoped></style>
