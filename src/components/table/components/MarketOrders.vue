<template>
  <table class="table table-compact w-full">
    <thead>
      <tr>
        <th>Price</th>
        <th>Size</th>
        <th>Account</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="orders in market_orders" :key="orders">
        <td v-if="market_token === 'USDC'">
          {{ (orders.account.price * Math.pow(10, -6)).toFixed(2) }}
        </td>
        <td v-if="market_token === 'ATLAS'">
          {{ (orders.account.price * Math.pow(10, -8)).toFixed(2) }}
        </td>
        <td>{{ orders.account.orderRemainingQty }}</td>
        <td>
          {{
            orders.account.orderInitializerPubkey.toString().substring(0, 4)
          }}...{{
            orders.account.orderInitializerPubkey
              .toString()
              .substring(
                orders.account.orderInitializerPubkey.toString().length - 4
              )
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
import { OrderAccountItem } from "@staratlas/factory";

defineProps({
  market_orders: {
    type: Array as PropType<Array<OrderAccountItem>>,
  },
  market_token: {
    type: String,
    default: "",
  },
});
</script>
