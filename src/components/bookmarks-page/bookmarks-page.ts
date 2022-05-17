// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { Component, Prop, Vue } from "vue-property-decorator";

import { $bookmarksStore, Link, Section } from "@/services/bookmarks";

import LinkFormComponent from "@/components/link-form/link-form.vue";

import Fuse from "fuse.js";

@Component({
  name: "bookmarks-page",
  components: {
    "link-form": LinkFormComponent,
  },
})
export default class LinksPageComponent extends Vue {
  @Prop() private filter: string;

  get sections() {
    return $bookmarksStore.sections;
  }

  get recentLinks() {
    return $bookmarksStore.recentBookmarks;
  }

  get showRecentLinks() {
    return this.recentLinks.length > 0;
  }

  get bookmarks() {
    const filter = this.filter?.trim();
    if (!filter || filter.length < 3) {
      return $bookmarksStore.sections;
    }

    return $bookmarksStore.sections
      .filter((section) => {
        const links = this.filterLinks(section.children, filter);
        return links.length > 0;
      })
      .map((originalSection) => {
        const section = Vue.observable(
          Object.assign<Section>({}, originalSection)
        );
        const links = this.filterLinks(originalSection.children, filter).map(
          (link) => {
            return Vue.observable(Object.assign<Link>({}, link));
          }
        );
        section.children = links;
        return section;
      });
  }

  private filterLinks(links: Link[], search: string) {
    const fuse = new Fuse(links, {
      keys: ["name"],
      shouldSort: true,
      minMatchCharLength: 1,
      useExtendedSearch: true,
      threshold: 0.3,
    });
    return search.length ? fuse.search(search).map(({ item }) => item) : links;
  }

  created() {
    Debug.setDebugModule("bookmarks-page", this);
  }
}
