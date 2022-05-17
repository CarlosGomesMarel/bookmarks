/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any

// Refrence v-select from https://vue-select.org/
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

import {
  BookmarkColors,
  Bookmark,
  ColorInfo,
  DefaultColorName,
} from "@/services/bookmarks";

@Component({
  name: "color-picker",
  components: {},
})
export default class ColorPickerComponent extends Vue {
  @Prop() private section: Bookmark;
  @Prop() private link: Bookmark;

  private colorValue: ColorInfo = this.colors.find(
    (item) => item.name == DefaultColorName
  );

  get colors() {
    const keys = Object.keys(BookmarkColors);
    return keys.map((key) => {
      return {
        name: key,
        backgroundColor: BookmarkColors[key].backgroundColor,
        color: BookmarkColors[key].color,
      };
    });
  }

  @Watch("link", { immediate: true, deep: true })
  onLinkChanged() {
    if (this.link) {
      const found = this.findColor(this.link.color, this.link.backgroundColor);
      if (found) {
        this.colorValue = found;
        return;
      }
    }

    if (this.section) {
      const found = this.findColor(
        this.section.color,
        this.section.backgroundColor
      );
      if (found) {
        this.colorValue = found;
        return;
      }
    }

    this.colorValue = this.colors.find((item) => item.name == DefaultColorName);
  }

  created() {
    Debug.setDebugModule("color-picker", this);
  }

  onColorChanged() {
    if (this.link) {
      this.link.color = this.colorValue.color;
      this.link.backgroundColor = this.colorValue.backgroundColor;
    }

    this.$emit("changed", this.colorValue);
  }

  dropdownShouldOpen() {
    return true;
  }

  private findColor(color: string, backgroundColor: string) {
    if (!color || !backgroundColor) {
      return null;
    }

    return this.colors.find(
      (item) =>
        color &&
        backgroundColor &&
        item.color == color &&
        item.backgroundColor == backgroundColor
    );
  }
}
