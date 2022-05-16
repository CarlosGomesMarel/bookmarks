import { Component, Vue } from "vue-property-decorator";

import { EventBus } from "@/support/event-bus";

import { $appInsightsService } from "@/services/app-insights/app-insights.service";

import BookmarksEditorComponent from "@/components/bookmarks-editor/bookmarks-editor.vue";
import LinksPageComponent from "@/components/bookmarks-page/bookmarks-page.vue";

@Component({
  components: {
    "bookmarks-editor": BookmarksEditorComponent,
    "bookmarks-page": LinksPageComponent,
  },
})
export default class AppComponent extends Vue {
  options = {};

  $refs = {
    linksEditorForm: {} as Modal,
  };

  helpLink = `mailto:carlos.gomes@marel.com?subject=Bookmarks Help`;

  showEditor = false;

  created() {
    Debug.setDebugModule("app", this);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $appInsightsService.setVueInstance((this as any).$appInsights);
    $appInsightsService.trackPageView("app");
  }

  showBookmarksEditor() {
    this.showEditor = true;
  }

  onCloseEditor() {
    this.showEditor = false;
  }
}
