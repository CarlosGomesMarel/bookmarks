// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { Section } from "@/services/bookmarks";
import ColorPickerComponent from "@/components/color-picker/color-picker.vue";

@Component({
  name: "section-editor",
  components: {
    "color-picker": ColorPickerComponent,
  },
})
export default class LinkEditorComponent extends Vue {
  @Prop() private section: Section;
  private previousSection: Section;

  showNameError = false;
  showUrlError = false;
  disabled = false;

  @Watch("section", { immediate: false, deep: true })
  onSectionChanged() {
    if (this.previousSection !== this.section) {
      // New section has been set.
      this.previousSection = this.section;
      return;
    }
    this.$emit("changed", this.section, null);
  }

  created() {
    Debug.setDebugModule("section-editor", this);
  }
}
