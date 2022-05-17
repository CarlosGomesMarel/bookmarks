// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { Component, Prop, Vue } from "vue-property-decorator";

import { $bookmarksStore, Link } from "@/services/bookmarks";

@Component({
  name: "link-form",
  components: {},
})
export default class LinkFormComponent extends Vue {
  @Prop() private link: Link;

  created() {
    Debug.setDebugModule("link-form", this);
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
