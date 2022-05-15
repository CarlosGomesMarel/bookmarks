// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { Component, Prop, Vue } from "vue-property-decorator";

import { Link } from "@/services/links";

@Component({
  name: "link-form",
  components: {},
})
export default class LinkFormComponent extends Vue {
  @Prop() private link: Link;

  created() {
    Debug.setDebugModule("link-form", this);
  }

  editLink() {
    // TODO:
    this.$emit("changed", this.link);
  }

  pinLink() {
    this.link.pinned = !this.link.pinned;
    this.$emit("changed", this.link);
  }
}
