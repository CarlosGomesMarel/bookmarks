// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { Component, Prop, Vue } from "vue-property-decorator";

import { $linksService, Link, Section } from "@/services/links";

import LinkFormComponent from "@/components/link-form/link-form.vue";
import LocalData from "@/support/local-storage";

@Component({
  name: "links-page",
  components: {
    "link-form": LinkFormComponent,
  },
})
export default class LinksPageComponent extends Vue {
  private sections: Section[] = [];
  private recentLinks: Link[] = [];

  created() {
    Debug.setDebugModule("links-page", this);

    this.sections = $linksService.sections();
    this.recentLinks = $linksService.recentLinks();
  }

  onLinkChanged(link: Link) {
    // TODO: Update
    // Consider moving the link within its section.
    // For example toggling PIN should move the link to end of section.
    LocalData.save("links", this.sections);
  }
}
