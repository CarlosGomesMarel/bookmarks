// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { Component, Prop, Vue } from "vue-property-decorator";

import { $linksService, Link } from "@/services/links";

import LinkFormComponent from "@/components/link-form/link-form.vue";

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
  public links: Link[] = [];

  get sections() {
    const sections: Section[] = [];
    sections.push({
      name: "Recent",
      links: [],
    });

    const sectionTags = new Set(
      this.links
        .filter((item) => item.tags && item.tags.length)
        .map((item) => {
          item.section = item.tags.join(" ");
          return item.section;
        })
    );

    sectionTags.forEach((section) => {
      const links = this.links.filter(
        (item) => item.tags && item.section === section
      );

      sections.push({
        name: section,
        links: links,
      });
    });

    const noTags = this.links.filter(
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
    Debug.log("links", this.links);
  }
}
