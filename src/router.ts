import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import AppComponent from "@/views/app/app.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: AppComponent,
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
