// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import { Link, Section } from "@/services/bookmarks";
import ColorPickerComponent from "@/components/color-picker/color-picker.vue";

@Component({
  name: "link-editor",
  components: {
    "color-picker": ColorPickerComponent,
  },
})
export default class LinkEditorComponent extends Vue {
  @Prop() private section: Section;
  @Prop() private link: Link;

  showNameError = false;
  showUrlError = false;
  disabled = false;

  @Watch("link", { immediate: false, deep: true })
  onLinkChanged() {
    this.$emit("changed", this.section, this.link);
  }

  created() {
    Debug.setDebugModule("link-editor", this);
  }
}
