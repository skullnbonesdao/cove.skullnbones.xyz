<template>
  <div>
    <ship-details-modal
      v-model="show_modal"
      @close="show_modal = false"
      @click-outside="show_modal = false"
      :asset_address="asset_address"
      :asset="asset_selected"
    >
    </ship-details-modal>
  </div>

  <div class="overflow-x-auto">
    <table class="table w-full">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>VWAP</th>
          <th>ASK</th>
          <th>BID</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="hover"
          v-for="asset in assets.filter(
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
            <div class="flex items-center space-x-2">
              <usdc-icon class="w-6"></usdc-icon>
              <div>
                <strong> {{ asset.tradeSettings.vwap.toFixed(2) }}</strong>
                <span> VWAP</span>
              </div>
            </div>
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
import { StarAtlasNFT } from "@/typescipt/interfaces/staratlasnft";
import ShipTableImageComponent from "@/components/table/components/ShipTableImageComponent.vue";
import ShipTableNameComponent from "@/components/table/components/ShipTableNameComponent.vue";
import ShipDetailsModal from "@/components/modals/ShipDetailsModal.vue";
import UsdcIcon from "@/components/icons/USDCIcon.vue";
import AskBidElements from "@/components/table/components/AskBidElements.vue";
import { staratlas_gmClientStore } from "@/store/staratlas_gmClient";

import { TOKEN_ATLAS, TOKEN_USDC } from "@/typescipt/const/tokens";

const props = defineProps({
  assets: { type: Array as PropType<Array<StarAtlasNFT>>, default: null },
  type: { type: String, default: "ship" },
});

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
</script>

<style scoped></style>
