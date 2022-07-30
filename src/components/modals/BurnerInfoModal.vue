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
    <div class="flex flex-col">
      <div>
        <h1 class="rounded-md mb-2 bg-base-300">The Plank</h1>
        <p class="text-sm text-secondary">
          This Tool is built to recover the SOL form NFTs you dont want anymore.
        </p>
        <p class="text-sm text-secondary">
          It will only work if you have the permission burn!
        </p>
        <div class="divider"></div>
        <h2 class="">How does this work?</h2>
        <ul class="steps steps-vertical">
          <li class="step step-primary">Connect your Solana-Wallet</li>
          <li class="step step-primary">Wait for your NFTs to load</li>
          <li class="step step-primary">
            <div class="flex flex-row space-x-2">
              <div>Choose your NFT and hit</div>
              <div>
                <button class="btn btn-xs btn-warning hover:bg-opacity-50">
                  Burn 🔥
                </button>
              </div>
            </div>
          </li>
          <li class="step step-primary">Approve the TX and wait</li>
          <li class="step step-primary">
            If the TX fails check your wallet or refresh the page!
          </li>
        </ul>
      </div>
      <p class="text-sm text-center text-red-500 p-2">
        ⚠️ Burned NFTs are not recoverable ⚠️
      </p>
      <button
        class="btn btn-primary hover:bg-opacity-50"
        @click="$emit('close', close)"
      >
        Continue
      </button>
    </div>
  </vue-final-modal>
</template>

<script lang="ts">
export default {
  name: "BurnerInfoModal",
  inheritAttrs: false,
  emits: ["close"],
};
</script>

<script setup lang="ts"></script>

<style scoped></style>
