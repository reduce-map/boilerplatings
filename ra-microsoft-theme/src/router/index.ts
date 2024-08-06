import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/element-ui",
    name: "element-ui",
    component: () => import("@/elementUI.vue"),
  },
  {
    path: "/fluent-ui",
    name: "fluent-ui",
    component: () => import("@/fluentUI.vue"),
  },
  {
    path: "/tabs",
    name: "Tabs",
    component: () => import("@/Tabs.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
