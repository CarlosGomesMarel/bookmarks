/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Vue } from "vue-property-decorator";

import Browser from "@/support/browser";
import TelemetryGridComponent from "@/components/telemetry-grid/telemetry-grid.vue";

@Component({
  components: {
    "telemetry-grid": TelemetryGridComponent,
  },
})
export default class TelemetryComponent extends Vue {
  options = {};

  hashCode: number = 0;

  $refs = {};

  created() {
    this.hashCode = Browser.getRouteParam(this.$route, "hashCode", 0);
  }
}
