import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "solana-wallets-vue/styles.css";
import "./index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createPinia } from "pinia";
const pinia = createPinia();
import vfmPlugin from "vue-final-modal";
import SmartTable from "vuejs-smart-table";
import SolanaWallets from "solana-wallets-vue";

import {
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

const walletOptions = {
  wallets: [
    new PhantomWalletAdapter(),
    new SlopeWalletAdapter(),
    new SolflareWalletAdapter(),
  ],
  autoConnect: true,
};

const app = createApp(App);

app
  .use(router)
  .use(pinia)
  .use(SmartTable)
  .use(vfmPlugin)
  .use(SolanaWallets, walletOptions)
  .mount("#app");
