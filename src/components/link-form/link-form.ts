// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { Component, Prop, Vue } from "vue-property-decorator";

import {
  $bookmarksStore,
  DefaultColor,
  Link,
  Section,
} from "@/services/bookmarks";

@Component({
  name: "link-form",
  components: {},
})
export default class LinkFormComponent extends Vue {
  @Prop() private section: Section;
  @Prop() private link: Link;

  created() {
    Debug.setDebugModule("link-form", this);
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
    const linkInfo = $bookmarksStore.findLinkById(this.link.id);

    if (!linkInfo.link.clickCount) {
      linkInfo.link.clickCount = 0;
    }

    linkInfo.link.clickCount++;
    $bookmarksStore.updateLink(linkInfo.section, linkInfo.link);
  }
}
