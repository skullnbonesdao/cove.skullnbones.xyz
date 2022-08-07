<template>
  <div>
    <market-details-modal
      v-model="show_modal"
      @close="show_modal = false"
      @click-outside="show_modal = false"
      :mint_address="asset_address"
      :asset="asset_selected"
    >
    </market-details-modal>
  </div>

  <div class="overflow-x-auto bg-base-100">
    <div class="flex w-full justify-end">
      <div class="flex p-1 form-control w-full max-w-xs">
        <input
          v-model="filters.name.value"
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full max-w-xs"
        />
      </div>
    </div>
    <VTable
      class="table w-full"
      :data="table_data"
      :filters="filters"
      sortHeaderClass="flex items-center justify-between w-full"
    >
      <!-- head -->
      <template #head="{ rows }">
        <tr>
          <th></th>
          <VTh sortKey="name">Name</VTh>
          <VTh v-if="rows[0]?.vwap ?? 0" sortKey="tradeSettings.vwap">VWAP</VTh>
          <th class="marketAsk">ASK</th>
          <th class="marketBid">BID</th>
          <th></th>
        </tr>
      </template>
      <template #body="{ rows }">
        <tr
          class="hover"
          v-for="row in rows"
          :key="row"
          @click="load_modal(row.mint)"
        >
          <th>
            <ship-table-image-component
              class="justify-center"
              :symbol="row.symbol"
              :img_url="'sa_images/webp/' + row._id + '.webp'"
            ></ship-table-image-component>
          </th>
          <td class="w-full">
            <ship-table-name-component
              :mint_address="row.mint"
            ></ship-table-name-component>
          </td>
          <td v-if="rows[0]?.vwap ?? 0">
            <vwap-element :vwap="row.vwap ?? 0"></vwap-element>
          </td>

          <td class="marketAsk">
            <ask-bid-elements
              :vwap="row.vwap"
              :price_usdc="
                staratlas_gmClient.top_market_orders.find(
                  (market) => market.mint === row.mint
                )?.price_usdc_sell
              "
              :price_atlas="
                staratlas_gmClient.top_market_orders.find(
                  (market) => market.mint === row.mint
                )?.price_atlas_sell
              "
            ></ask-bid-elements>
          </td>
          <td class="marketBid">
            <ask-bid-elements
              :vwap="row.vwap"
              :price_usdc="
                staratlas_gmClient.top_market_orders.find(
                  (market) => market.mint === row.mint
                )?.price_usdc_buy
              "
              :price_atlas="
                staratlas_gmClient.top_market_orders.find(
                  (market) => market.mint === row.mint
                )?.price_atlas_buy
              "
            ></ask-bid-elements>
          </td>
          <td>
            <div class="tooltip" data-tip="Market">
              <a
                class="btn btn-sm btn-primary btn-circle"
                :href="
                  'https://play.staratlas.com/market/' +
                  row.name.replace(/\s+/g, '-').toLowerCase()
                "
                target="_blank"
                ><i class="bi bi-shop"></i
              ></a>
            </div>
          </td>
        </tr>
      </template>
    </VTable>
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
import { use_staratlasStore } from "@/store/staratlas_store";
import { calculatesPercentageVWAPvsMarket } from "@/typescipt/helper/calculate_market";
import {
  ResourcePrices,
  staratlas_scoreClientStore,
} from "@/store/staratlas_scoreClient";
import {
  TOKEN_AMMO,
  TOKEN_FOOD,
  TOKEN_FUEL,
  TOKEN_TOOL,
} from "@/typescipt/const/staratlas";
import { tokenPricesWebsocket } from "@/store/token_price_websocket";

const props = defineProps({
  sa_asset_type: { type: String, default: "ship" },
});

const show_modal = ref(false);
const asset_selected = ref();
const asset_address = ref("1111111");
const table_data = ref([] as MarketTableElements[]);

const staratlas_store = use_staratlasStore();
const staratlas_gmClient = staratlas_gmClientStore();
const staratlas_scoreClient = staratlas_scoreClientStore();
const token_ws = tokenPricesWebsocket();

const filters = ref({
  name: { value: "", keys: ["name", "symbol"] },
});

onMounted(async () => {
  await load_data();
});

watch(props, async () => {
  table_data.value = [];
  await load_data();
});

async function load_data() {
  const filtered_nfts = staratlas_store.nfts
    .filter((nft) => nft.attributes.itemType === props.sa_asset_type)
    .sort((a, b) => a.tradeSettings.vwap - b.tradeSettings.vwap);

  //INIT DATA
  filtered_nfts.forEach((nft) => {
    table_data.value.push({
      _id: nft._id,
      mint: nft.mint,
      name: nft.name,
      symbol: nft.symbol,
      vwap: nft.tradeSettings.vwap,
      price_ask_usdc: 0,
      price_ask_atlas: 0,
      price_bid_usdc: 0,
      price_bid_atlas: 0,
      price_ask_usdc_discount: 0,
      price_ask_atlas_discount: 0,
      price_bid_usdc_discount: 0,
      price_bid_atlas_discount: 0,
      apr_usdc: 0,
      apr_atlas: 0,
    });
  });

  //Prepare Orders
  if (staratlas_gmClient.orders.length === 0) {
    await staratlas_gmClient.fetchOrders();
  }
  table_data.value.forEach((element) =>
    staratlas_gmClient.filter_orders(element.mint)
  );

  //Append Market order to DATA
  table_data.value.forEach((element, index) => {
    staratlas_gmClient.filter_orders(element.mint);
    const market_orders_filtered = staratlas_gmClient.top_market_orders.find(
      (order) => order.mint === element.mint
    );
    //Market Prices
    table_data.value[index].price_ask_usdc =
      market_orders_filtered?.price_usdc_sell ?? 0;
    table_data.value[index].price_ask_atlas =
      market_orders_filtered?.price_atlas_sell ?? 0;
    table_data.value[index].price_bid_usdc =
      market_orders_filtered?.price_usdc_buy ?? 0;
    table_data.value[index].price_bid_atlas =
      market_orders_filtered?.price_atlas_buy ?? 0;
    //Market Discounts
    table_data.value[index].price_ask_usdc_discount =
      calculatesPercentageVWAPvsMarket(
        table_data.value[index].vwap,
        table_data.value[index].price_ask_usdc,
        table_data.value[index].price_ask_usdc == -1
      );
    table_data.value[index].price_ask_atlas_discount =
      calculatesPercentageVWAPvsMarket(
        table_data.value[index].vwap / parseFloat(token_ws.m_atlas),
        table_data.value[index].price_ask_atlas,
        table_data.value[index].price_ask_atlas == -1
      );
    table_data.value[index].price_bid_usdc_discount =
      calculatesPercentageVWAPvsMarket(
        table_data.value[index].vwap,
        table_data.value[index].price_bid_usdc,
        table_data.value[index].price_bid_usdc == -1
      );
    table_data.value[index].price_bid_atlas_discount =
      calculatesPercentageVWAPvsMarket(
        table_data.value[index].vwap / parseFloat(token_ws.m_atlas),
        table_data.value[index].price_bid_atlas,
        table_data.value[index].price_ask_atlas == -1
      );
  });

  const resource_prices: ResourcePrices = {
    ammo_price: staratlas_gmClient.orders.filter(
      (order) => order.orderMint === TOKEN_AMMO.toString()
    )[0].price,
    food_price: staratlas_gmClient.orders.filter(
      (order) => order.orderMint === TOKEN_FOOD.toString()
    )[0].price,
    fuel_price: staratlas_gmClient.orders.filter(
      (order) => order.orderMint === TOKEN_FUEL.toString()
    )[0].price,
    tool_price: staratlas_gmClient.orders.filter(
      (order) => order.orderMint === TOKEN_TOOL.toString()
    )[0].price,
  };

  /*// Get APRs
  if (props.sa_asset_type === "ship") {
    for (const element of table_data.value) {
      const index = table_data.value.indexOf(element);
      console.log(table_data.value[index].name);

      table_data.value[index].apr_atlas =
        await staratlas_scoreClient.getAprForShipAtlas(
          element.mint,
          element.vwap * parseFloat(token_ws.m_atlas),
          resource_prices
        );
    }
  }*/
}

function load_modal(asset_address_new: string) {
  asset_address.value = asset_address_new;
  show_modal.value = true;
  asset_selected.value = staratlas_store.nfts.find(
    (asset) => asset.mint === asset_address_new
  );
}
</script>

<style scoped></style>
