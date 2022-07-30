<template>
  <vue-final-modal
    v-slot="{ close }"
    v-bind="$attrs"
    classes="flex justify-center items-center md:px-20 md:py-10"
    content-class="overflow-auto relative flex flex-col max-h-full p-4 border dark:border-base-300 rounded bg-base-300"
  >
    <div class="flex-shrink-0 flex justify-end pt-4 pr-4">
      <button class="btn btn-primary btn-circle" @click="$emit('close', close)">
        X
      </button>
    </div>

    <div v-if="asset" class="md:m-20">
      <h1 class="text-center">{{ asset.name }}</h1>
      <div class="pb-4 flex flex-col md:flex-row items-center md:space-x-2">
        <img
          alt="asset_image"
          :src="asset.image"
          class="object-contain p-1 rounded-xl w-96"
        />
        <div class="flex flex-col space-y-2">
          <div class="bg-base-100 p-4 rounded-xl">
            <p>{{ asset.description }}</p>
          </div>
          <div
            v-if="asset.tradeSettings.vwap || asset.primarySales"
            class="bg-base-100 p-4 rounded-xl"
          >
            <div class="grid xl:grid-cols-4 md:gap-4">
              <div>
                <h4>VWAP</h4>
                <div class="flex flex-row space-x-1">
                  <usdc-icon class="w-6"></usdc-icon>
                  <div>
                    {{ asset.tradeSettings.vwap.toFixed(2) }}
                  </div>
                </div>
              </div>
              <div>
                <h4>Supply</h4>
                <div>
                  {{
                    asset.primarySales.reduce((sum, current) => {
                      return sum + current.supply;
                    }, 0)
                  }}
                </div>
              </div>
              <div>
                <a
                  class="btn"
                  :href="
                    'https://play.staratlas.com/market/' +
                    asset.name.replace(/\s+/g, '-').toLowerCase()
                  "
                  target="_blank"
                  >to Marketplace</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tabs">
        <a
          class="tab md:tab-lg tab-lifted"
          :class="active_tab === 'info' ? 'tab-active' : ''"
          @click="active_tab = 'info'"
          >Info</a
        >
        <a
          class="tab md:tab-lg tab-lifted"
          :class="active_tab === 'market' ? 'tab-active' : ''"
          @click="active_tab = 'market'"
          >Market</a
        >
        <a
          class="tab md:tab-lg tab-lifted"
          :class="active_tab === 'score' ? 'tab-active' : ''"
          @click="active_tab = 'score'"
          >Score</a
        >
        <a
          class="tab md:tab-lg tab-lifted"
          :class="active_tab === 'stats' ? 'tab-active' : ''"
          @click="active_tab = 'stats'"
          >Stats</a
        >
        <a
          class="tab md:tab-lg tab-lifted"
          :class="active_tab === 'explorer' ? 'tab-active' : ''"
          @click="active_tab = 'explorer'"
          >Explorer</a
        >
        <a
          class="tab md:tab-lg tab-lifted"
          :class="active_tab === 'images' ? 'tab-active' : ''"
          @click="active_tab = 'images'"
          >Images</a
        >
      </div>

      <div class="flex flex-col" v-if="active_tab === 'info'">
        <div class="bg-base-100 p-4 rounded-r-xl">
          <h1 class="p-2">Info</h1>

          <h2 class="p-2">Attributes</h2>
          <div class="grid md:grid-cols-4 gap-4">
            <div
              v-for="(attribute, key) in asset.attributes"
              :key="attribute"
              class="shadow-inner bg-base-200 rounded-md px-2 py-1"
            >
              <h4 class="capitalize">{{ key }}</h4>
              <div class="capitalize">{{ attribute }}</div>
            </div>
          </div>
        </div>
        <div class="bg-base-100 p-4" v-if="asset.slots.crewSlots">
          <h2 class="p-2">Crew Slots</h2>
          <div class="grid md:grid-cols-4 gap-4">
            <div
              v-for="attribute in asset.slots.crewSlots"
              :key="attribute"
              class="shadow-inner bg-base-200 rounded-md px-2 py-1"
            >
              <h4 class="capitalize">{{ attribute.type }}</h4>
              <div class="capitalize">
                {{ attribute.quantity }} {{ attribute.size }}
              </div>
            </div>
          </div>
        </div>
        <div class="bg-base-100 p-4" v-if="asset.slots.componentSlots">
          <h2 class="p-2">Component Slots</h2>
          <div class="grid md:grid-cols-4 gap-4">
            <div
              v-for="attribute in asset.slots.componentSlots"
              :key="attribute"
              class="shadow-inner bg-base-200 rounded-md px-2 py-1"
            >
              <h4 class="capitalize">{{ attribute.type }}</h4>
              <div>{{ attribute.quantity }} {{ attribute.size }}</div>
            </div>
          </div>
        </div>
        <div
          class="bg-base-100 p-4 rounded-b-xl"
          v-if="asset.slots.moduleSlots"
        >
          <h2 class="p-2">Module Slots</h2>
          <div class="grid md:grid-cols-4 gap-4">
            <div
              v-for="attribute in asset.slots.moduleSlots"
              :key="attribute"
              class="shadow-inner bg-base-200 rounded-md px-2 py-1"
            >
              <h4 class="capitalize">{{ attribute.type }}</h4>
              <div>{{ attribute.quantity }} {{ attribute.size }}</div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="active_tab === 'market'">
        <market-tab :mint_address="asset_address"></market-tab>
      </div>
      <div v-if="active_tab === 'score'">
        <score-tab :mint_address="asset_address"></score-tab>
      </div>
      <div v-if="active_tab === 'stats'">
        <h1>- Under Construction -</h1>
      </div>
      <div v-if="active_tab === 'explorer'">
        <explorer-tab :mint_address="asset_address"></explorer-tab>
      </div>
      <div v-if="active_tab === 'images'">
        <images-tab :mint_address="asset_address"></images-tab>
      </div>
    </div>
    <div class="flex-shrink-0 flex justify-center items-center pt-4">
      <button class="btn btn-primary" @click="$emit('close', close)">
        close
      </button>
    </div>
  </vue-final-modal>
</template>

<script lang="ts">
export default {
  name: "MarketDetailsModal",
  inheritAttrs: false,
  emits: ["close"],
};
</script>

<script setup lang="ts">
import { defineProps, onMounted, ref, PropType, watch, watchEffect } from "vue";
import { staratlasStore } from "@/store/staratlas_store";
import { staratlasFactory } from "@/store/staratlas_factory";
import { StarAtlasNFT } from "@/typescipt/interfaces/StarAtlasNFT";
import ImagesTab from "@/components/tabs/ImagesTab.vue";
import MarketTab from "@/components/tabs/MarketTab.vue";
import ExplorerTab from "@/components/tabs/ExplorerTab.vue";
import UsdcIcon from "@/components/icons/USDCIcon.vue";
import ScoreTab from "@/components/tabs/ScoreTab.vue";

const active_tab = ref("info");

const props = defineProps({
  asset_address: {
    type: String,
    default: "none",
  },
  asset: {
    type: Object as PropType<StarAtlasNFT>,
    default: undefined,
  },
});
</script>

<style scoped></style>
