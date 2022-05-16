import { Component, Vue } from "vue-property-decorator";

import LinksTreeEditorComponent from "@/components/links-tree-editor/links-tree-editor.vue";
import { $appInsightsService } from "@/services/app-insights/app-insights.service";
import { $bookmarksStore } from "@/services/bookmarks";

@Component({
  components: {
    "links-tree-editor": LinksTreeEditorComponent,
  },
})
export default class BookmarksEditorFormComponent extends Vue {
  name: "bookmarks-editor-form";

  get sections() {
    return $bookmarksStore.sections;
  }

  get disabled() {
    return false;
  }

  created() {
    Debug.setDebugModule("bookmarks-editor-form", this);
  }

  show() {
    $appInsightsService.trackPageView("bookmarks-editor-form");
    this.$modal.show("bookmarks-editor-form");
  }

  hide() {
    this.$modal.hide("bookmarks-editor-form");
  }

  cancel() {
    this.hide();
  }
}
