import { Component, Vue } from "vue-property-decorator";

import LinksTreeEditorComponent from "@/components/links-tree-editor/links-tree-editor.vue";
import LinkEditorComponent from "@/components/link-editor/link-editor.vue";
import SectionEditorComponent from "@/components/section-editor/section-editor.vue";

import { $bookmarksStore, Link, Section } from "@/services/bookmarks";

@Component({
  components: {
    "links-tree-editor": LinksTreeEditorComponent,
    "link-editor": LinkEditorComponent,
    "section-editor": SectionEditorComponent,
  },
})
export default class BookmarksEditorComponent extends Vue {
  name: "bookmarks-editor";

  link: Link = null;
  section: Section = null;

  get sections() {
    return $bookmarksStore.sections;
  }

  get disabled() {
    return false;
  }

  created() {
    Debug.setDebugModule("bookmarks-editor", this);
  }

  onSelected(section: Section, link: Link) {
    console.log("onSelected", section?.name, link?.name);
    this.section = section;
    this.link = link;
  }

  onLinkChanged(section: Section, link: Link) {
    $bookmarksStore.updateLink(section, link);
  }

  onSectionChanged(section: Section) {
    $bookmarksStore.updateSection(section);
  }

  close() {
    this.$emit("close");
  }
}
