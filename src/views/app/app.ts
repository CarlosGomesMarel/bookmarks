import { Component, Vue } from "vue-property-decorator";

import { EventBus } from "@/support/event-bus";

import { $appInsightsService } from "@/services/app-insights/app-insights.service";
import LinksEditorComponent from "@/components/links-editor/links-editor.vue";
import LinksPageComponent from "@/components/links-page/links-page.vue";

@Component({
  components: {
    "links-editor": LinksEditorComponent,
    "links-page": LinksPageComponent,
  },
})
export default class AppComponent extends Vue {
  options = {};

  $refs = {};

  helpLink = `mailto:carlos.gomes@marel.com?subject=Bookmarks Help`;

  created() {
    Debug.setDebugModule("app", this);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $appInsightsService.setVueInstance((this as any).$appInsights);
    $appInsightsService.trackPageView("app");
  }

  addLink() {
    EventBus.Instance.$emit(EventBus.AddLink, true);
  }
}
