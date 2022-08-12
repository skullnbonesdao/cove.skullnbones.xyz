<template>
  <div class="features">
    <div class="flex flex-col w-full border-opacity-50 p-4">
      <div
        class="grid px-16 card bg-base-300 rounded-box place-items-center space-y-2"
      >
        <h1 class="m-3">Features</h1>
      </div>
    </div>

    <div class="flex flex-col w-full border-opacity-50 p-4">
      <div
        class="grid px-16 py-3 card bg-base-300 rounded-box place-items-center space-y-2"
      >
        <div class="card w-96 bg-base-100 shadow-xl image-full">
          <figure>
            <img :src="marketView" alt="MarketView" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">Market V2</h2>
            <p>Updated Galactic Marketplace V2</p>
          </div>
        </div>
        <div class="card w-96 bg-base-100 shadow-xl image-full">
          <figure>
            <img :src="chartsView" alt="MarketCharts" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">Charts</h2>
            <p>Track recent trades now!</p>
          </div>
        </div>
        <div class="card w-96 bg-base-100 shadow-xl image-full">
          <figure>
            <img :src="burnerView" alt="BurnerView" />
          </figure>
          <div class="card-body">
            <h2 class="card-title">Burner</h2>
            <p>Burn your SCAM-NFTs and recover SOL</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import marketView from "@/assets/features/marketplace_view.png";
import burnerView from "@/assets/features/burner_view.png";
import chartsView from "@/assets/features/marketplaceCharts_view.png";
</script>
