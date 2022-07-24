<template>
  <div class="p-4 bg-base-100">
    <h1>Explorer</h1>
    <div class="pt-4">
      <div class="overflow-x-auto">
        <table class="table w-full">
          <!-- head -->
          <thead>
            <tr>
              <th>Explorer Name</th>
              <th>URL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Solscan.io</td>
              <td>
                <a class="link" :href="solscanURL" target="_blank">{{
                  solscanURL
                }}</a>
              </td>
            </tr>
            <tr>
              <td>SolanaBeach</td>
              <td>
                <a class="link" :href="solanabeachURL" target="_blank">{{
                  solanabeachURL
                }}</a>
              </td>
            </tr>
            <tr>
              <td>SolanaFM</td>
              <td>
                <a class="link" :href="solanaFmURL" target="_blank">{{
                  solanaFmURL
                }}</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "ExplorerTab",
};
</script>

<script setup lang="ts">
import { ref, defineProps, onMounted, watch } from "vue";
const props = defineProps({
  mint_address: {
    type: String,
    default: "",
  },
});

let solscanURL = ref("");
let solanabeachURL = ref("");
let solanaFmURL = ref("");

function build_explorer_strings() {
  solscanURL.value = "https://solscan.io/token/" + props.mint_address;
  solanabeachURL.value = "https://solanabeach.io/address/" + props.mint_address;
  solanaFmURL.value = "https://solana.fm/address/" + props.mint_address;
}

onMounted(() => {
  build_explorer_strings();
});

watch(
  () => props.mint_address,
  (value) => {
    build_explorer_strings();
  }
);
</script>

<style scoped></style>
