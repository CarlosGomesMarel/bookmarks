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

  name: string = null;
  href: string = null;
  color: ColorInfo = null;

  $refs = {
    modal: {} as Modal,
  };

  get disabled() {
    return !this.name || !this.href;
  }

  created() {
    Debug.setDebugModule("add-link-modal", this);
  }

  @Watch("name")
  onNameChanged() {
    this.showNameError = !this.name;
  }

  @Watch("href")
  onUrlChanged() {
    this.showUrlError = !this.href;
  }

  @Watch("link")
  onLinkChanged() {
    this.name = null;
    this.href = null;
    Vue.nextTick(() => {
      this.showNameError = false;
      this.showUrlError = false;
    });
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
    this.link.name = this.name;
    this.link.href = this.href;
    this.$emit("save", this.section, this.link);
    this.hide();
  }
}
