import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { createPinia } from "pinia";
const pinia = createPinia();
import vfmPlugin from "vue-final-modal";
import SmartTable from "vuejs-smart-table";

const app = createApp(App);

app.use(router).use(pinia).use(SmartTable).use(vfmPlugin).mount("#app");
