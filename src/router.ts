import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeComponent from "@/views/home/home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeComponent,
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
