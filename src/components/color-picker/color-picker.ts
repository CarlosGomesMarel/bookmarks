// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { Component, Prop, Vue } from "vue-property-decorator";

import { Link, BookmarkColors, DefaultColorName } from "@/services/bookmarks";

@Component({
  name: "color-picker",
  components: {},
})
export default class ColorPickerComponent extends Vue {
  @Prop() private link: Link;

  private colorValue = this.colors.find(
    (item) => item.name == DefaultColorName
  );

  get colors() {
    const keys = Object.keys(BookmarkColors);
    return keys.map((key) => {
      return {
        name: key,
        backgroundColor: BookmarkColors[key].background,
        color: BookmarkColors[key].color,
      };
    });
  }

  get color() {
    if (this.link) {
      const found = this.colors.find(
        (item) =>
          this.link.color &&
          this.link.backgroundColor &&
          item.color == this.link.color &&
          item.backgroundColor == this.link.backgroundColor
      );
      if (found) {
        return found;
      }
    }

    return this.colorValue;
  }

  set color(value: any) {
    this.colorValue = value;
  }

  created() {
    Debug.setDebugModule("color-picker", this);
  }

  onColorChanged() {
    // TODO:
    this.$emit("changed", this.color);
  }

  dropdownShouldOpen() {
    return true;
  }
}
