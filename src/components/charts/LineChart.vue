<template>
  <div v-if="is_loading" class="flex justify-center">
    <grid-loader :color="'#ffa500'"></grid-loader>
  </div>
  <div v-else>
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
  name: "LineChart",
};
</script>

<script setup lang="ts">
import { defineProps, onMounted, PropType, ref, watch } from "vue";
import { Trade } from "@/typescipt/interfaces/Trade";
import GridLoader from "vue-spinner/src/GridLoader.vue";

const props = defineProps({
  mint_address: {
    type: String,
    default: undefined,
  },
});
const is_loading = ref(true);
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

  title: {
    text: "Last 100 trades",
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
  trading_history.value.sort((a: Trade, b: Trade) => a.timestamp - b.timestamp);
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
      x: new Date(element.timestamp * 1000),
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
  trading_history.value.sort((a: Trade, b: Trade) => a.timestamp - b.timestamp);
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
      x: new Date(element.timestamp * 1000),
      y: price?.toFixed(3),
    };
  });
}

onMounted(async () => {
  is_loading.value = true;
  await load_table_data();
  is_loading.value = false;
});

watch(
  () => props.mint_address,
  async (value) => {
    is_loading.value = true;
    await load_table_data();
    is_loading.value = false;
  }
);
</script>

<style scoped></style>
