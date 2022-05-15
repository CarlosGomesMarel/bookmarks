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
  {
    path: "/telemetry/:hashCode",
    name: "telemetry",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "telemetry" */ "@/views/telemetry/telemetry.vue"
      ),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
