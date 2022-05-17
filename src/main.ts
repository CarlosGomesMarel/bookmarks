/**
 * Main entry point.
 */

import DebugModule from "@/support/debug";
/**
 * Initialize Debug before all other modules
 * */
DebugModule.ensureCalled();

import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { Env } from "@/support/environment";

import Vue from "vue";
Vue.config.productionTip = false;

import VueJsModal from "vue-js-modal";
Vue.use(VueJsModal);

import VueAppInsights from "vue-application-insights";

import VueSelect from "vue-select";
import "vue-select/dist/vue-select.css";
Vue.component("v-select", VueSelect);

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const options = {
  timeout: 3000,
  closeButton: false,
  position: "top-center",
  hideProgressBar: true,
};
Vue.use(Toast, options);

import VueTreeList from "vue-tree-list";
Vue.use(VueTreeList);

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBars,
  faBug,
  faCog,
  faEdit,
  faExclamationTriangle,
  faFileCsv,
  faFileExcel,
  faFileExport,
  faFileImport,
  faFolder,
  faHome,
  faLink,
  faPlus,
  faQuestion,
  faRefresh,
  faSave,
  faShareSquare,
  faSpinner,
  faThumbtack,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faBars,
  faBug,
  faCog,
  faEdit,
  faExclamationTriangle,
  faFileCsv,
  faFileExcel,
  faFileExport,
  faFileImport,
  faFolder,
  faHome,
  faLink,
  faPlus,
  faQuestion,
  faRefresh,
  faSave,
  faShareSquare,
  faSpinner,
  faThumbtack,
  faTrash
);
Vue.component("font-awesome-icon", FontAwesomeIcon);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
Vue.use(VueAppInsights as any, {
  id: Env.VUE_APP_APPINSIGHTS_INSTRUMENTATIONKEY,
});

import App from "./app.vue";
import router from "./router";

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");

if (Env.LogEnvironment) {
  console.log("Environment variables");

  for (const key in process.env) {
    console.log(key, process.env[key]);
  }
}
