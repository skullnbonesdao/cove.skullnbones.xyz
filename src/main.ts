import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import { createPinia } from "pinia";
const pinia = createPinia();
import vfmPlugin from "vue-final-modal";

const app = createApp(App);

app.use(router).use(pinia).use(vfmPlugin).mount("#app");
