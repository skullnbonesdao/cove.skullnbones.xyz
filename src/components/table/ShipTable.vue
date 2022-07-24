<template>
  <div>
    <ship-details-modal
      class="md:ml-20"
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
          <th>Favorite Color</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="hover"
          v-for="asset in assets.filter(
            (asset) => asset.attributes.itemType === type
          )"
          :key="asset"
          @click="load_modal(asset.mint)"
        >
          <th>
            <ship-table-image-component
              :symbol="asset.symbol"
              :img_url="'sa_images/webp/' + asset._id + '.webp'"
            ></ship-table-image-component>
          </th>
          <td>
            <ship-table-name-component
              :name="asset.name"
            ></ship-table-name-component>
          </td>
          <td>{{ asset.tradeSettings.vwap.toFixed(2) }}</td>
          <td>Red</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
export default {
  symbol: "ShipTable",
};
</script>

<script setup lang="ts">
import { defineProps, PropType, ref } from "vue";
import { StarAtlasNFT } from "@/typescipt/interfaces/staratlasnft";
import ShipTableImageComponent from "@/components/table/components/ShipTableImageComponent.vue";
import ShipTableNameComponent from "@/components/table/components/ShipTableNameComponent.vue";
import ShipDetailsModal from "@/components/modals/ShipDetailsModal.vue";

const props = defineProps({
  assets: { type: Array as PropType<Array<StarAtlasNFT>>, default: null },
  type: { type: String, default: "ship" },
});

const show_modal = ref(false);
const asset_selected = ref();
const asset_address = ref("1111111");

function load_modal(asset_address_new: string) {
  asset_address.value = asset_address_new;
  show_modal.value = true;
  asset_selected.value = props.assets.find(
    (asset) => asset.mint === asset_address_new
  );
}
</script>

<style scoped></style>
