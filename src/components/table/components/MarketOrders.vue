<template>
  <table class="table table-compact table-zebra w-full">
    <thead>
      <tr>
        <th>Price</th>
        <th>Size</th>
        <th>Account</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="orders in market_orders" :key="orders">
        <td v-if="market_token === 'USDC'" class="flex flex-row">
          <div>{{ orders.price }}</div>
        </td>
        <td v-if="market_token === 'ATLAS'" class="flex flex-row">
          <div>
            {{ orders.price }}
          </div>
        </td>
        <td>{{ orders.orderQtyRemaining }}</td>
        <td>
          {{ orders.owner.substring(0, 4) }}...{{
            orders.owner.substring(orders.owner.length - 4)
          }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script lang="ts">
export default {
  name: "MarketOrders",
};
</script>

<script setup lang="ts">
import { defineProps, PropType } from "vue";
import { Order } from "@staratlas/factory";
import UsdcIcon from "@/components/icons/USDCIcon.vue";
import AtlasIcon from "@/components/icons/ATLASIcon.vue";

defineProps({
  market_orders: {
    type: [] as PropType<Order[]>,
    default: [],
  },
  market_token: {
    type: String,
    default: "",
  },
});
</script>
