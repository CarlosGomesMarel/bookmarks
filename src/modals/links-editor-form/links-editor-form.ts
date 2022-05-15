import { Component, Vue } from "vue-property-decorator";

import LinksEditorComponent from "@/components/links-editor/links-editor.vue";
import { $appInsightsService } from "@/services/app-insights/app-insights.service";
import { $sectionStore } from "@/services/links";

@Component({
  components: {
    "links-editor": LinksEditorComponent,
  },
})
export default class LinksEditorFormComponent extends Vue {
  name: "links-editor-form";

  get sections() {
    return $sectionStore.sections;
  }

  get disabled() {
    return false;
  }

  created() {
    Debug.setDebugModule("links-editor-form", this);
  }

  show() {
    $appInsightsService.trackPageView("links-editor-form");
    this.$modal.show("links-editor-form");
  }

  hide() {
    this.$modal.hide("links-editor-form");
  }

  cancel() {
    this.hide();
  }
}
