// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { Component, Prop, Vue } from "vue-property-decorator";

import SectionEditorComponent from "@/components/section-editor/section-editor.vue";

import { Section } from "@/services/bookmarks";
import { $appInsightsService } from "@/services/app-insights/app-insights.service";

@Component({
  name: "section-editor-modal",
  components: {
    "section-editor": SectionEditorComponent,
  },
})
export default class SectionEditorModal extends Vue {
  @Prop() private section: Section;

  $refs = {
    modal: {} as Modal,
  };

  created() {
    Debug.setDebugModule("section-editor-modal", this);
  }

  onChanged(section: Section) {
    this.$emit("changed", section);
  }

  show() {
    $appInsightsService.trackPageView("section-editor-modal");
    this.$modal.show("section-editor-modal");
  }

  hide() {
    this.$modal.hide("section-editor-modal");
  }

  cancel() {
    this.hide();
  }
}
