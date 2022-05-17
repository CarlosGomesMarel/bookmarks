// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { ColorInfo, Link, Section } from "@/services/bookmarks";
import ColorPickerComponent from "@/components/color-picker/color-picker.vue";
import { $appInsightsService } from "@/services/app-insights/app-insights.service";

@Component({
  name: "add-link-modal",
  components: {
    "color-picker": ColorPickerComponent,
  },
})
export default class AddLinkModal extends Vue {
  @Prop() private section: Section;
  @Prop() private link: Link;

  showNameError = false;
  showUrlError = false;
  disabled = false;

  linkName: string = null;
  href: string = null;
  color: ColorInfo = null;

  $refs = {
    modal: {} as Modal,
  };

  created() {
    Debug.setDebugModule("add-link-modal", this);
  }

  @Watch("link")
  onLinkChanged() {
    console.error(
      this.section?.name,
      this.link?.name,
      this.link?.id,
      this.link?.color,
      this.link?.backgroundColor,
      this.link
    );
  }

  onColorChanged(color: ColorInfo) {
    this.color = color;
  }

  show() {
    $appInsightsService.trackPageView("add-link-modal");
    this.$modal.show("add-link-modal");
  }

  hide() {
    this.$modal.hide("add-link-modal");
  }

  cancel() {
    this.hide();
  }

  save() {
    this.$emit("save", this.section, this.link);
  }
}
