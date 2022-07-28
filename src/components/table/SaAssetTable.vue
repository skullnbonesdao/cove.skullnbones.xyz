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
          v-for="asset in ref_assets.filter(
            (nft) => nft.attributes.itemType === type
          )"
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
            <a
              class="btn btn-sm"
              :href="
                'https://play.staratlas.com/market/' +
                asset.name.replace(/\s+/g, '-').toLowerCase()
              "
              target="_blank"
              ><i class="bi bi-shop"></i
            ></a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
export default {
  name: "SaAssetTable",
};
</script>

<script setup lang="ts">
import { defineProps, onMounted, PropType, ref } from "vue";
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

const props = defineProps({
  assets: { type: Array as PropType<Array<StarAtlasNFT>>, default: null },
  type: { type: String, default: "ship" },
});

const ref_assets = ref(props.assets);
const show_modal = ref(false);
const asset_selected = ref();
const asset_address = ref("1111111");

const staratlas_gmClient = staratlas_gmClientStore();

onMounted(async () => {
  await staratlas_gmClient.getOrders();
  props.assets.forEach((nft) => staratlas_gmClient.filter_orders(nft.mint));
});

function load_modal(asset_address_new: string) {
  asset_address.value = asset_address_new;
  show_modal.value = true;
  asset_selected.value = props.assets.find(
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
    ref_assets.value.reverse();
  }
}

function sortName() {
  ref_assets.value.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}

function sortVWAP() {
  ref_assets.value.sort((a, b) => {
    return a.tradeSettings.vwap - b.tradeSettings.vwap;
  });
}

function sortSymbol() {
  ref_assets.value.sort((a, b) => {
    return a.symbol.localeCompare(b.symbol);
  });
}
</script>

<style scoped></style>
