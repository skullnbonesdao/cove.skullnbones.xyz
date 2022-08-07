<template>
  <vue-final-modal
    v-slot="{ close }"
    v-bind="$attrs"
    classes="flex justify-center items-center md:px-20 md:py-10"
    content-class="overflow-auto relative flex flex-col max-h-full md:p-4 p-2 border dark:border-base-300 rounded bg-base-300"
  >
    <button class="sticky top-0 z-50 flex-shrink-0 flex justify-end pb-1">
      <button class="btn btn-primary btn-circle" @click="$emit('close', close)">
        X
      </button>
    </button>

    <div id="content relative">
      <div v-if="asset" class="md:m-20">
        <div class="card bg-base-100 shadow-xl image-full space-y-1">
          <figure>
            <img :src="asset.image" alt="asset_image" />
          </figure>
          <div class="card-body">
            <h1 class="text-center">{{ asset.name }}</h1>

            <p class="rounded-box">
              {{ asset.description }}
            </p>
            <div class="card-actions">
              <div class="grid md:grid-cols-3 grid-cols-2 md:gap-4 gap-2">
                <div>
                  <h4>VWAP</h4>
                  <div class="item inline-flex items-baseline space-x-2">
                    <usdc-icon class="self-center w-5 h-5 rounded-full">
                    </usdc-icon>
                    <span>
                      {{ asset.tradeSettings.vwap.toFixed(2) }}
                    </span>
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
                <div class="col-span-2">
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

        <div class="tabs pt-2">
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
import { use_staratlasStore } from "@/store/staratlas_store";
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
