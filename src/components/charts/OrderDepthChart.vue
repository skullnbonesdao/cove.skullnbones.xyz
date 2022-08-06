<template>
  <h1>ORDER DEPTH</h1>
  <div class="bg-black">
    <apexchart type="donut" :options="options" :series="series"></apexchart>
    {{ order_buys.map((order) => order.price) }}
  </div>
</template>

<script lang="ts">
export default {
  name: "OrderDepthChart",
};
</script>

<script setup lang="ts">
import { defineProps, PropType, ref } from "vue";
import { Order } from "@staratlas/factory";

const props = defineProps({
  order_buys: {
    type: [] as PropType<Order[]>,
    default: undefined,
  },
  order_sells: {
    type: [] as PropType<Order[]>,
    default: [],
  },
});

const options = {
  options: {},
};

const series = [
  props.order_buys?.flatMap((order) => order.price)[0],
  props.order_sells?.flatMap((order) => order.price)[0],
];
</script>

<style scoped></style>
