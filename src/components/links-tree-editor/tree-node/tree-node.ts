/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { Component, Prop, Vue } from "vue-property-decorator";

import { DefaultColor, Link, Section } from "@/services/bookmarks";

@Component({
  name: "tree-node",
  components: {},
})
export default class TreeNodeComponent extends Vue {
  @Prop() private section: Section;
  @Prop() private link: Link;

  get isLeaf() {
    return (<any>this.link)?.isLeaf;
  }

  created() {
    Debug.setDebugModule("tree-node", this);
  }

  get backgroundColor() {
    return (
      this.link.backgroundColor ||
      this.section?.backgroundColor ||
      DefaultColor.backgroundColor
    );
  }

  get color() {
    return this.link.color || this.section?.color || DefaultColor.color;
  }

  onClick() {
    // Already handled by tree view.
    // this.$emit("click", this.link);
  }
}
