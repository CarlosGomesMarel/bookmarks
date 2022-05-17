import { Component, Vue } from "vue-property-decorator";

import LinksTreeEditorComponent from "@/components/links-tree-editor/links-tree-editor.vue";
import LinkEditorComponent from "@/components/link-editor/link-editor.vue";
import SectionEditorComponent from "@/components/section-editor/section-editor.vue";
import AddLinkModal from "@/components/add-link-modal/add-link-modal.vue";

import {
  $bookmarksStore,
  DefaultLinkInfo,
  Link,
  LinkInfo,
  Section,
} from "@/services/bookmarks";

@Component({
  components: {
    "links-tree-editor": LinksTreeEditorComponent,
    "link-editor": LinkEditorComponent,
    "section-editor": SectionEditorComponent,
    "add-link-modal": AddLinkModal,
  },
})
export default class BookmarksEditorComponent extends Vue {
  name: "bookmarks-editor";

  selected: LinkInfo = Object.assign({}, DefaultLinkInfo);
  added: LinkInfo = Object.assign({}, DefaultLinkInfo);

  $refs = {
    addLinkModal: {} as any,
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

    this.showAddLinkModal();
  }

  onSaveAddedLink(section: Section, link: Link) {
    $bookmarksStore.addToSection(link, section);
  }

  close() {
    this.$emit("close");
  }

  showAddLinkModal() {
    if (this.$refs.addLinkModal) {
      this.$refs.addLinkModal.show();
    }
  }

  hideAddLinkModal() {
    if (this.$refs.addLinkModal) {
      this.$refs.addLinkModal.hide();
    }
  }
}
