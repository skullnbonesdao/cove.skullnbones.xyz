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
    <VTable
      class="table w-full"
      :data="table_data"
      sortHeaderClass="flex items-center justify-between w-full"
    >
      <template #head>
        <tr>
          <th colspan="3" class="bg-base-100"></th>
          <th colspan="2" class="bg-base-100">ASK</th>
          <th colspan="2" class="bg-base-100">BID</th>
          <th colspan="2" class="bg-base-100">APR</th>
          <th colspan="1" class="bg-base-100"></th>
        </tr>
        <tr>
          <th></th>
          <VTh sortKey="name">Name</VTh>
          <VTh sortKey="vwap">VWAP</VTh>
          <VTh sortKey="price_ask_usdc">USDC</VTh>
          <VTh sortKey="price_ask_atlas">ATLAS</VTh>
          <VTh sortKey="price_bid_usdc">USDC</VTh>
          <VTh sortKey="price_bid_atlas">ATLAS</VTh>
          <th>USDC</th>
          <th>ATLAS</th>
          <th></th>
        </tr>
      </template>
      <template #body="{ rows }">
        <tr
          v-for="row in rows"
          :key="row.id"
          class="hover"
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
          <td>
            <price-element text="VWAP" :price="row.vwap"></price-element>
          </td>
          <td>
            <price-element
              text=""
              :vwap="row.vwap"
              :price="row.price_ask_usdc"
            ></price-element>
          </td>
          <td>
            <price-element
              text=""
              :vwap="row.vwap"
              currency="atlas"
              :price="row.price_ask_atlas"
            ></price-element>
          </td>
          <td>
            <price-element
              text=""
              :vwap="row.vwap"
              :price="row.price_bid_usdc"
            ></price-element>
          </td>
          <td>
            <price-element
              text=""
              :vwap="row.vwap"
              currency="atlas"
              :price="row.price_bid_atlas"
            ></price-element>
          </td>
          <td>{{ row.apr_usdc.toFixed(2) }}</td>
          <td>{{ row.apr_atlas.toFixed(2) }}</td>
          <td>
            <div class="tooltip" data-tip="Market">
              <a
                class="btn btn-sm btn-secondary btn-circle"
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
  name: "SaAssetTableAdvanced",
};
</script>

<script setup lang="ts">
import { onMounted, ref, defineProps, watch } from "vue";
import { staratlasStore } from "@/store/staratlas_store";
import { MarketTableElements } from "@/typescipt/interfaces/MarkeTableElements";
import { staratlas_gmClientStore } from "@/store/staratlas_gmClient";
import ShipTableImageComponent from "@/components/table/components/ShipTableImageComponent.vue";
import PriceElement from "@/components/table/components/PriceElement.vue";
import ShipTableNameComponent from "@/components/table/components/ShipTableNameComponent.vue";
import MarketDetailsModal from "@/components/modals/MarketDetailsModal.vue";

const props = defineProps({
  sa_asset_type: { type: String, default: "ship" },
});

const staratlas_store = staratlasStore();
const staratlas_gmClient = staratlas_gmClientStore();

const show_modal = ref(false);
const asset_selected = ref();
const asset_address = ref("1111111");

const table_data = ref([] as MarketTableElements[]);

onMounted(async () => {
  await load_data();
});

watch(props, async () => {
  table_data.value = [];
  await load_data();
});

async function load_data() {
  const filtered_nfts = staratlas_store.nfts.filter(
    (nft) => nft.attributes.itemType === props.sa_asset_type
  );

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
      apr_usdc: 0,
      apr_atlas: 0,
    });
  });

  //Prepare Orders
  await staratlas_gmClient.getOrders();
  table_data.value.forEach((element) =>
    staratlas_gmClient.filter_orders(element.mint)
  );

  table_data.value.sort((a, b) => a.vwap - b.vwap);

  //Append Market order to DATA
  table_data.value.forEach((element, index) => {
    staratlas_gmClient.filter_orders(element.mint);
    const market_orders_filtered = staratlas_gmClient.top_market_orders.find(
      (order) => order.mint === element.mint
    );
    table_data.value[index].price_ask_usdc =
      market_orders_filtered?.price_usdc_sell ?? 0;
    table_data.value[index].price_ask_atlas =
      market_orders_filtered?.price_atlas_sell ?? 0;
    table_data.value[index].price_bid_usdc =
      market_orders_filtered?.price_usdc_buy ?? 0;
    table_data.value[index].price_bid_atlas =
      market_orders_filtered?.price_atlas_buy ?? 0;
  });
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
