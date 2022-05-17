// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { Component, Prop, Vue } from "vue-property-decorator";

import LinkEditorComponent from "@/components/link-editor/link-editor.vue";

import { Link, Section } from "@/services/bookmarks";
import { $appInsightsService } from "@/services/app-insights/app-insights.service";

@Component({
  name: "link-editor-modal",
  components: {
    "link-editor": LinkEditorComponent,
  },
})
export default class LinkEditorModal extends Vue {
  @Prop() private section: Section;
  @Prop() private link: Link;

  $refs = {
    modal: {} as Modal,
  };

  created() {
    Debug.setDebugModule("link-editor-modal", this);
  }

  onChanged(section: Section, link: Link) {
    this.$emit("changed", section, link);
  }

  show() {
    $appInsightsService.trackPageView("link-editor-modal");
    this.$modal.show("link-editor-modal");
  }

  hide() {
    this.$modal.hide("link-editor-modal");
  }

  cancel() {
    this.hide();
  }
}
