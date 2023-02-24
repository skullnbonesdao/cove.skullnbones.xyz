<template>
  <div class="flex flex-col w-full border-opacity-50 md:p-4 pt-1">
    <div
      class="grid px-16 card bg-base-300 rounded-box place-items-center space-y-2"
    >
      <h1>Market</h1>
      <div class="grid sm:grid-cols-2 md:grid-cols-4 sm:gap-10 gap-4 pb-4">
        <price-ticker
          asset_name="BTC/USDC"
          :asset_price="tokenWS.token_price.bitcoin.toFixed(2)"
        ></price-ticker>
        <price-ticker
          asset_name="SOL/USDA"
          :asset_price="tokenWS.token_price.solana.toFixed(2)"
        ></price-ticker>
        <price-ticker
          asset_name="POLIS/USDC"
          :asset_price="tokenWS.token_price.polis.toFixed(4)"
        ></price-ticker>
        <price-ticker
          asset_name="ATLAS/USDC"
          :asset_price="tokenWS.token_price.atlas.toFixed(4)"
        ></price-ticker>
      </div>
    </div>

    <div class="divider"></div>

    <div class="bg-base-300 rounded-xl place-items-center p-1">
      <div class="tabs flex flex-row justify-center">
        <a
          class="tab md:tab-lg tab-bordered uppercase"
          :class="tableType_selected === 'simple' ? 'tab-active' : ''"
          @click="tableType_selected = 'simple'"
          >simple</a
        >
        <a
          class="tab md:tab-lg tab-bordered uppercase"
          :class="tableType_selected === 'advanced' ? 'tab-active' : ''"
          @click="tableType_selected = 'advanced'"
          >advanced</a
        >
      </div>

      <div v-if="staratlas_store.status === 'fetched'">
        <div class="tabs justify-center">
          <div class="" v-for="asset in tab_entries" :key="asset">
            <a
              @click="staratlas_itemType_selected = asset.toString()"
              class="tab md:tab-lg tab-bordered tab-lifted uppercase"
              :class="
                staratlas_itemType_selected === asset ? ' tab-active' : ''
              "
              >{{ asset }}</a
            >
          </div>
        </div>
        <sa-asset-table-simple
          v-if="tableType_selected === 'simple'"
          :sa_asset_type="staratlas_itemType_selected"
        ></sa-asset-table-simple>
        <sa-asset-table-advanced
          v-if="tableType_selected === 'advanced'"
          :sa_asset_type="staratlas_itemType_selected"
        ></sa-asset-table-advanced>
      </div>
      <div v-else class="grid place-items-center">
        <grid-loader :color="'#ffa500'"></grid-loader>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  symbol: "MarketView",
};
</script>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onlyUnique } from "@/typescipt/helper/sorting";
import SaAssetTableSimple from "@/components/table/SaAssetTableSimple.vue";
import { use_staratlasStore } from "@/store/staratlas_store";
import { tokenPricesWebsocket } from "@/store/token_price_websocket";
import GridLoader from "vue-spinner/src/GridLoader.vue";
import PriceTicker from "@/components/special/PriceTicker.vue";
import SaAssetTableAdvanced from "@/components/table/SaAssetTableAdvanced.vue";

const staratlas_store = use_staratlasStore();
const tokenWS = tokenPricesWebsocket();
tokenWS.init();

const tab_entries = ref();

const tableType_selected = ref("advanced");
const staratlas_itemType_selected = ref("ship");

function switch_itemType_selected(newValue: string) {
  staratlas_itemType_selected.value = newValue;
}

onMounted(async () => {
  await staratlas_store.fetchFullData();
  tab_entries.value = staratlas_store.nfts
    .map((nft) => nft.attributes.itemType)
    .filter(onlyUnique);
});
</script>

<style scoped></style>
