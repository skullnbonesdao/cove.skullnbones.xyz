<template>
  <div class="flex space-x-2 justify-end">
    <select
      v-model="selected_pair"
      class="select select-bordered select-sm w-full max-w-xs"
    >
      <option>ATLAS</option>
      <option>USDC</option>
    </select>
    <select
      v-model="selected_timeframe"
      class="select select-bordered select-sm w-full max-w-xs"
    >
      <option>5min</option>
      <option>1h</option>
      <option>1day</option>
    </select>
  </div>
  <div v-if="is_loading" class="flex justify-center">
    <grid-loader :color="'#ffa500'"></grid-loader>
  </div>
  <div v-else>
    <div class="m-2 badge badge-secondary">testing</div>
    <apexchart
      type="candlestick"
      height="250"
      class="invertible"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script lang="ts">
export default {
  name: "CandleStickChart",
};
</script>

<script setup lang="ts">
import { defineProps, onMounted, PropType, ref, watch } from "vue";
import { Trade } from "@/typescipt/interfaces/Trade";
import GridLoader from "vue-spinner/src/GridLoader.vue";
import { TradeCandlestick } from "@/typescipt/interfaces/TradeCandlestick";

const props = defineProps({
  mint_address: {
    type: String,
    default: undefined,
  },
});
const is_loading = ref(true);
const selected_pair = ref("ATLAS");
const selected_timeframe = ref("5min");
const series = ref([
  {
    data: [
      {
        x: new Date(1538778600000),
        y: [6629.81, 6650.5, 6623.04, 6633.33],
      },
    ],
  },
]);

const chartOptions = {
  chart: {
    type: "candlestick",
    height: 350,
  },
  title: {
    text: "CandleStick Chart",
    align: "left",
  },
  xaxis: {
    type: "datetime",
  },
  yaxis: {
    tooltip: {
      enabled: true,
    },
  },
};

async function load_table_data() {
  const currency =
    selected_pair.value === "ATLAS"
      ? "ATLASXmbPQxBUYbxPsV97usA3fPQYEqzQBUHgiFCUsXx"
      : "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

  const time =
    selected_timeframe.value === "5min"
      ? 60 * 60 * 5
      : selected_timeframe.value === "1h"
      ? 60 * 60 * 60
      : 60 * 60 * 60 * 24;

  const trading_history = ref();
  await fetch(
    "https://api.skullnbones.xyz/candles/" +
      props.mint_address +
      "/" +
      currency +
      "/" +
      time
  )
    .then((res) => res.json())
    .then((data) => (trading_history.value = data));

  series.value[0].data = [];

  trading_history.value.forEach((dataPoint: TradeCandlestick) =>
    series.value[0].data.push({
      x: new Date(Date.parse(dataPoint._id.time)),
      y: [
        parseFloat(dataPoint.open.toFixed(2)),
        parseFloat(dataPoint.high.toFixed(2)),
        parseFloat(dataPoint.low.toFixed(2)),
        parseFloat(dataPoint.close.toFixed(2)),
      ],
    })
  );
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

watch(
  () => selected_pair.value,
  async (value) => {
    is_loading.value = true;
    await load_table_data();
    is_loading.value = false;
  }
);

watch(
  () => selected_timeframe.value,
  async (value) => {
    is_loading.value = true;
    await load_table_data();
    is_loading.value = false;
  }
);
</script>

<style scoped></style>
