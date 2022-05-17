/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Vue } from "vue-property-decorator";

import AddLinkModal from "@/components/add-link-modal/add-link-modal.vue";
import LinkEditorModal from "@/modals/link-editor-modal/link-editor-modal.vue";
import LinksTreeEditorComponent from "@/components/links-tree-editor/links-tree-editor.vue";
import SectionEditorModal from "@/modals/section-editor-modal/section-editor-modal.vue";

import {
  $bookmarksStore,
  DefaultLinkInfo,
  Link,
  LinkInfo,
  Section,
} from "@/services/bookmarks";

@Component({
  components: {
    "add-link-modal": AddLinkModal,
    "link-editor-modal": LinkEditorModal,
    "links-tree-editor": LinksTreeEditorComponent,
    "section-editor-modal": SectionEditorModal,
  },
})
export default class BookmarksEditorComponent extends Vue {
  name: "bookmarks-editor";

  selected: LinkInfo = Object.assign({}, DefaultLinkInfo);
  added: LinkInfo = Object.assign({}, DefaultLinkInfo);

  $refs = {
    addLinkModal: {} as any,
    linkEditModal: {} as any,
    sectionEditModal: {} as any,
  };

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
    this.selected.section = section;
    this.selected.link = link;

    if (this.selected.link) {
      this.$refs.sectionEditModal.hide();
      this.$refs.linkEditModal.show();
    } else {
      this.$refs.linkEditModal.hide();

      if (this.selected.section) {
        this.$refs.sectionEditModal.show();
      } else {
        this.$refs.sectionEditModal.hide();
      }
    }
  }

  onLinkChanged(section: Section, link: Link) {
    $bookmarksStore.updateLink(section, link);
  }

  onSectionChanged(section: Section) {
    $bookmarksStore.updateSection(section);
  }

  onAddLink(section: Section, link: Link) {
    this.added.section = section;
    this.added.link = link;

    this.$refs.addLinkModal.show();
  }

  onSaveAddedLink(section: Section, link: Link) {
    $bookmarksStore.addToSection(link, section);
  }

  close() {
    this.$emit("close");
  }
}
