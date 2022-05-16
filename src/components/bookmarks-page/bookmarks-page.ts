// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { Component, Vue } from "vue-property-decorator";

import { $bookmarksStore, Link } from "@/services/bookmarks";

import LinkFormComponent from "@/components/link-form/link-form.vue";
import LocalData from "@/support/local-storage";

@Component({
  name: "bookmarks-page",
  components: {
    "link-form": LinkFormComponent,
  },
})
export default class LinksPageComponent extends Vue {
  get sections() {
    return $bookmarksStore.sections;
  }

  get recentLinks() {
    return $bookmarksStore.sections;
  }

  created() {
    Debug.setDebugModule("bookmarks-page", this);
  }

  onLinkChanged(link: Link) {
    // TODO: Update
    // Consider moving the link within its section.
    // For example toggling PIN should move the link to end of section.
    LocalData.save("links", this.sections);
  }
}