import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/market",
    name: "market",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/MarketView.vue"),
  },
  {
    path: "/burner",
    name: "burner",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/BurnerView.vue"),
  },
  {
    path: "/features",
    name: "features",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/FeaturesView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
