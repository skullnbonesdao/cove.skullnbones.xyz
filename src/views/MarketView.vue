<template>
  <div class="flex flex-col w-full border-opacity-50 p-4">
    <div
      class="grid px-16 card bg-base-300 rounded-box place-items-center space-y-2"
    >
      <h1>Market</h1>
      <div class="grid sm:grid-cols-2 md:grid-cols-4 sm:gap-10 gap-4 pb-4">
        <price-ticker
          asset_name="BTC/USDC"
          :asset_price="tokenWS.m_btc"
        ></price-ticker>
        <price-ticker
          asset_name="SOL/USDC"
          :asset_price="tokenWS.m_sol"
        ></price-ticker>
        <price-ticker
          asset_name="POLIS/USDC"
          :asset_price="tokenWS.m_polis"
        ></price-ticker>
        <price-ticker
          asset_name="ATLAS/USDC"
          :asset_price="tokenWS.m_atlas"
        ></price-ticker>
      </div>
    </div>

    <div class="divider"></div>

    <div class="bg-base-300 rounded-box place-items-center p-1">
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
        <s-a-asset-table2></s-a-asset-table2>
        <!--        <sa-asset-table
          :type="staratlas_itemType_selected"
          :assets="staratlas_store.nfts"
        ></sa-asset-table>-->
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
import SaAssetTable from "@/components/table/SaAssetTable.vue";
import { staratlasStore } from "@/store/staratlas_store";
import { tokenPricesWebsocket } from "@/store/token_price_websocket";
import GridLoader from "vue-spinner/src/GridLoader.vue";
import PriceTicker from "@/components/special/PriceTicker.vue";
import SAAssetTable2 from "@/components/table/SAAssetTable2.vue";

const staratlas_store = staratlasStore();
const tokenWS = tokenPricesWebsocket();
tokenWS.initMarkets();

const tab_entries = staratlas_store.nfts
  .map((nft) => nft.attributes.itemType)
  .filter(onlyUnique);

const staratlas_itemType_selected = ref("ship");

function switch_itemType_selected(newValue: string) {
  staratlas_itemType_selected.value = newValue;
}

onMounted(async () => {
  await staratlas_store.fetchFullData();
});
</script>

<style scoped></style>
