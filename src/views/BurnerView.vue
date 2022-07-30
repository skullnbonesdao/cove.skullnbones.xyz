<template>
  <div>
    <burner-info-modal
      v-model="show_modal"
      @close="show_modal = false"
      @click-outside="show_modal = false"
    >
    </burner-info-modal>
  </div>
  <div class="about">
    <div class="flex flex-col w-full border-opacity-50 p-4">
      <div
        class="grid px-16 card bg-base-300 rounded-box place-items-center space-y-2"
      >
        <h1>The Plank</h1>
      </div>
    </div>
  </div>
  <FireElement style="opacity: 0.2"></FireElement>
  <div class="flex flex-col w-full mt-3">
    <div
      class="justify-center mx-12 p-3 card bg-base-300 rounded-box place-items-center"
    >
      <p class="text-4xl">The Plank</p>

      <div class="alert-warning shadow-lg text-center rounded-md px-2">
        <p>🔥 You are about to burn your NFTs 🔥</p>
      </div>
    </div>
    <div class="divider"></div>
    <div class="bg-base-300 mx-12 pt-5 rounded-box">
      <div class="flex flex-col text-center">
        <p class="text-xl text-red-500">
          The Plank will <b>destroy</b> your NFT it will
          <b>not be recoverable</b>!
        </p>
        <p>
          Do use this with caution we advise you to use a separate wallet beside
          your main-wallet.
        </p>
        <p class="text-lg">💰 Your NFT-SOL-Rent will be recovered 💰</p>
      </div>
      <div v-if="!publicKey" class="flex flex-col items-center pt-10 space-y-2">
        <p class="text-xl">You are not connected!</p>
        <wallet-multi-button dark></wallet-multi-button>
      </div>
      <div class="flex justify-center p-9">
        <div
          class="grid sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4 grid-flow-row gap-4"
        >
          <nft-burner-card
            v-for="nft in solana_burner.nftArray"
            :key="nft"
            :name="nft.data.name ? nft.data.name : 'unknown'"
            :mint="nft.mint"
            :img_url="nft.data.img_url"
          >
          </nft-burner-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "BurnerView",
};
</script>

<script setup lang="ts">
import { ref } from "vue";
import FireElement from "@/components/special/FireElement.vue";
import { WalletMultiButton } from "solana-wallets-vue";
import { useWallet } from "solana-wallets-vue";
import { watch } from "vue";
import { solana_burnerStore } from "@/store/solana_burnerStore";
import NftBurnerCard from "@/components/cards/NFTBurnerCard.vue";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import {
  TOAST_ERROR,
  TOAST_INFO,
  TOAST_SUCCESS,
} from "@/typescipt/toast-config/toasts";
import { status_message_enum } from "@/typescipt/interfaces/StatusMessage";
import BurnerInfoModal from "@/components/modals/BurnerInfoModal.vue";

const show_modal = ref(true);

const { publicKey } = useWallet();
const solana_burner = solana_burnerStore();

watch(publicKey, async () => {
  if (publicKey.value) {
    await solana_burner.fetch_baseInfoNFTs(publicKey.value.toString());
    await solana_burner.fetch_additionData();
  }
});

const old_message = ref();

watch(solana_burner, () => {
  if (solana_burner.message.message.length > 0)
    if (old_message.value != solana_burner.message.message) {
      old_message.value = solana_burner.message.message;

      switch (solana_burner.message.type) {
        case status_message_enum.info:
          createToast(solana_burner.message.message, TOAST_INFO);
          break;
        case status_message_enum.success:
          createToast(solana_burner.message.message, TOAST_SUCCESS);
          break;
        case status_message_enum.error:
          createToast(solana_burner.message.message, TOAST_ERROR);
          break;
      }
    }
});
</script>

<style scoped></style>
