// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { Component, Prop, Vue } from "vue-property-decorator";

import { $linksService, Link } from "@/services/links";

import LinkFormComponent from "@/components/link-form/link-form.vue";
import LocalData from "@/support/local-storage";

interface Section {
  name: string;
  links: Link[];
}

@Component({
  name: "links-page",
  components: {
    "link-form": LinkFormComponent,
  },
})
export default class LinksPageComponent extends Vue {
  private links: Link[] = [];
  private recentLinks: Link[] = [];

  get sections() {
    const sections: Section[] = [];

    if (this.recentLinks.length) {
      sections.push({
        name: "Recent",
        links: this.recentLinks,
      });
    }

    const pinned = this.links.filter((item) => item.pinned);
    if (pinned.length) {
      sections.push({
        name: "Quick Links",
        links: pinned,
      });
    }

    const unPinnedLinks = this.links.filter((item) => !item.pinned);

    const sectionTags = new Set(
      unPinnedLinks
        .filter((item) => !item.pinned && item.tags && item.tags.length)
        .map((item) => {
          item.section = item.tags.join(" ");
          return item.section;
        })
    );

    sectionTags.forEach((section) => {
      const links = unPinnedLinks.filter(
        (item) => item.tags && item.section === section
      );

      sections.push({
        name: section,
        links: links,
      });
    });

    const noTags = unPinnedLinks.filter(
      (item) => !item.tags || item.tags.length == 0
    );
    if (noTags.length) {
      sections.push({
        name: "(None)",
        links: noTags,
      });
    }

    return sections;
  }

  created() {
    Debug.setDebugModule("links-page", this);

    this.links = $linksService.links();
    this.recentLinks = $linksService.recentLinks();
  }

  onLinkChanged(link: Link) {
    // TODO: Update
    // Consider moving the link within its section.
    // For example toggling PIN should move the link to end of section.
    LocalData.save("links", this.links);
  }
}
