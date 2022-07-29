<template>
  <div>
    <market-details-modal
      v-model="show_modal"
      @close="show_modal = false"
      @click-outside="show_modal = false"
      :asset_address="asset_address"
      :asset="asset_selected"
    >
    </market-details-modal>
  </div>

  <div class="overflow-x-auto">
    <table class="table w-full">
      <!-- head -->
      <thead>
        <tr>
          <th>
            <sortable-element
              text=""
              @sort-up="sort_table('up', 'symbol')"
              @sort-down="sort_table('down', 'symbol')"
            ></sortable-element>
          </th>
          <th>
            <sortable-element
              text="Name"
              @sort-up="sort_table('up', 'name')"
              @sort-down="sort_table('down', 'name')"
            ></sortable-element>
          </th>
          <th>
            <sortable-element
              text="VWAP"
              @sort-up="sort_table('up', 'vwap')"
              @sort-down="sort_table('down', 'vwap')"
            ></sortable-element>
          </th>
          <th>ASK</th>
          <th>BID</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="hover"
          v-for="asset in assets"
          :key="asset"
          @click="load_modal(asset.mint)"
        >
          <th>
            <ship-table-image-component
              class="justify-center"
              :symbol="asset.symbol"
              :img_url="'sa_images/webp/' + asset._id + '.webp'"
            ></ship-table-image-component>
          </th>
          <td class="w-full">
            <ship-table-name-component
              :mint_address="asset.mint"
            ></ship-table-name-component>
          </td>
          <td>
            <vwap-element
              :vwap="asset.tradeSettings.vwap.toFixed(2) ?? 0"
            ></vwap-element>
          </td>

          <td>
            <ask-bid-elements
              :vwap="asset.tradeSettings.vwap"
              :price_usdc="
                staratlas_gmClient.top_market_orders.find(
                  (market) => market.mint === asset.mint
                )?.price_usdc_sell
              "
              :price_atlas="
                staratlas_gmClient.top_market_orders.find(
                  (market) => market.mint === asset.mint
                )?.price_atlas_sell
              "
            ></ask-bid-elements>
          </td>
          <td>
            <ask-bid-elements
              :vwap="asset.tradeSettings.vwap"
              :price_usdc="
                staratlas_gmClient.top_market_orders.find(
                  (market) => market.mint === asset.mint
                )?.price_usdc_buy
              "
              :price_atlas="
                staratlas_gmClient.top_market_orders.find(
                  (market) => market.mint === asset.mint
                )?.price_atlas_buy
              "
            ></ask-bid-elements>
          </td>
          <td>
            <div class="tooltip" data-tip="Market">
              <a
                class="btn btn-sm btn-secondary btn-circle"
                :href="
                  'https://play.staratlas.com/market/' +
                  asset.name.replace(/\s+/g, '-').toLowerCase()
                "
                target="_blank"
                ><i class="bi bi-shop"></i
              ></a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
export default {
  name: "SaAssetTableSimple",
};
</script>

<script setup lang="ts">
import { defineProps, onMounted, PropType, ref, watch } from "vue";
import { StarAtlasNFT } from "@/typescipt/interfaces/StarAtlasNFT";
import ShipTableImageComponent from "@/components/table/components/ShipTableImageComponent.vue";
import ShipTableNameComponent from "@/components/table/components/ShipTableNameComponent.vue";
import MarketDetailsModal from "@/components/modals/MarketDetailsModal.vue";
import UsdcIcon from "@/components/icons/USDCIcon.vue";
import AskBidElements from "@/components/table/components/AskBidElements.vue";
import { staratlas_gmClientStore } from "@/store/staratlas_gmClient";

import { TOKEN_ATLAS, TOKEN_USDC } from "@/typescipt/const/tokens";
import VwapElement from "@/components/table/components/VWAPElement.vue";
import SortableElement from "@/components/table/components/SortableElement.vue";
import { MarketTableElements } from "@/typescipt/interfaces/MarkeTableElements";
import { staratlasStore } from "@/store/staratlas_store";

const props = defineProps({
  sa_asset_type: { type: String, default: "ship" },
});

const show_modal = ref(false);
const asset_selected = ref();
const asset_address = ref("1111111");
const assets = ref([] as StarAtlasNFT[]);

const staratlas_store = staratlasStore();
const staratlas_gmClient = staratlas_gmClientStore();

onMounted(async () => {
  await load_data();
});

watch(props, async () => {
  await load_data();
});

async function load_data() {
  assets.value = staratlas_store.nfts.filter(
    (nft) => nft.attributes.itemType === props.sa_asset_type
  );
  await staratlas_gmClient.getOrders();
  assets.value.forEach((nft) => staratlas_gmClient.filter_orders(nft.mint));
}

function load_modal(asset_address_new: string) {
  asset_address.value = asset_address_new;
  show_modal.value = true;
  asset_selected.value = assets.value.find(
    (asset) => asset.mint === asset_address_new
  );
}

function sort_table(direction: string, entry: string) {
  switch (entry) {
    case "name":
      sortName();
      break;
    case "vwap":
      sortVWAP();
      break;
    case "symbol":
      sortSymbol();
      break;
  }

  if (direction === "down") {
    assets.value.reverse();
  }
}

function sortName() {
  assets.value.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}

function sortVWAP() {
  assets.value.sort((a, b) => {
    return a.tradeSettings.vwap - b.tradeSettings.vwap;
  });
}

function sortSymbol() {
  assets.value.sort((a, b) => {
    return a.symbol.localeCompare(b.symbol);
  });
}
</script>

<style scoped></style>