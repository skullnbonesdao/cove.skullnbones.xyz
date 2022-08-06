<template>
  <div class="">
    <div class="m-2 badge badge-secondary">testing</div>
    <apexchart
      type="line"
      height="250"
      class="invertible"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script lang="ts">
export default {
  name: "TradingChart",
};
</script>

<script setup lang="ts">
import { defineProps, onMounted, PropType, ref, watch } from "vue";
import { Trade } from "@/typescipt/interfaces/Trade";
import { Order } from "@staratlas/factory";

const props = defineProps({
  mint_address: {
    type: String,
    default: undefined,
  },
});

const trading_data_atlas = ref([]);
const trading_data_usdc = ref([]);
const series = ref([
  {
    name: "ATLAS",
    type: "line",
    data: trading_data_atlas,
  },
  {
    name: "USDC",
    type: "line",
    data: trading_data_usdc,
  },
]);

const chartOptions = {
  chart: {
    height: 350,
    type: "line",
    stacked: false,
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: [3, 4],
  },
  title: {
    text: "History",
    align: "center",
  },
  xaxis: {
    type: "datetime",
  },
  yaxis: [
    {
      axisTicks: {
        show: true,
      },
    },
    {
      opposite: true,
      axisTicks: {
        show: true,
      },
    },
  ],
};

async function load_table_data() {
  const trading_history = ref();
  await fetch(
    "https://api.skullnbones.xyz/trades/" +
      props.mint_address +
      "/ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx"
  )
    .then((res) => res.json())
    .then((data) => (trading_history.value = data));
  trading_history.value.sort((a: Trade, b: Trade) => a.block - b.block);
  trading_data_atlas.value = trading_history.value.map((element: Trade) => {
    const price =
      element.seller_token === "ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx"
        ? (element.seller_amount * Math.pow(10, -element.seller_decimals)) /
          element.buyer_amount
        : element.buyer_token === "ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx"
        ? (element.buyer_amount * Math.pow(10, -element.buyer_decimals)) /
          element.seller_amount
        : null;
    return {
      x: new Date(element.block * 1000),
      y: price?.toFixed(9),
    };
  });

  await fetch(
    "https://api.skullnbones.xyz/trades/" +
      props.mint_address +
      "/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
  )
    .then((res) => res.json())
    .then((data) => (trading_history.value = data));
  trading_history.value.sort((a: Trade, b: Trade) => a.block - b.block);
  trading_data_usdc.value = trading_history.value.map((element: Trade) => {
    const price =
      element.seller_token === "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
        ? (element.seller_amount * Math.pow(10, -element.seller_decimals)) /
          element.buyer_amount
        : element.buyer_token === "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
        ? (element.buyer_amount * Math.pow(10, -element.buyer_decimals)) /
          element.seller_amount
        : null;

    return {
      x: new Date(element.block * 1000),
      y: price?.toFixed(3),
    };
  });
  console.log(trading_data_atlas.value);
  console.log(trading_data_usdc.value);
}

onMounted(async () => {
  await load_table_data();
});

watch(
  () => props.mint_address,
  async (value) => {
    await load_table_data();
  }
);
</script>

<style scoped></style>
