/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any

/*
Using vue-tree-list from https://github.com/ParadeTo/vue-tree-list
*/
import { v4 as uuidv4 } from "uuid";
import { Component, Vue } from "vue-property-decorator";

import { Tree } from "vue-tree-list";

import { $bookmarksStore, Link, Section } from "@/services/bookmarks";

@Component({
  name: "links-tree-editor",
  components: {},
})
export default class LinksTreeEditorComponent extends Vue {
  section: Section = null;
  link: Link = null;

  get sections() {
    return $bookmarksStore.sections;
  }

  get treeData() {
    const sections = this.sections.map((section) =>
      this.prepareTreekSection(section)
    );
    return new Tree(sections);
  }

  created() {
    Debug.setDebugModule("links-tree-editor", this);
  }

  onChangeName(change: any) {
    if (!change.node) {
      // Completed.
      return;
    }

    const node = change.node;
    Debug.log("onChangeName", node.name, node.isLeaf, node);

    if (node.isLeaf) {
      $bookmarksStore.updateLink(node.parent, node);
    } else {
      $bookmarksStore.updateSection(node);
    }
  }

  onClick(node: any) {
    console.log("onClick", node.name, node.id, node.isLeaf);

    const [sectionObj, linkObj] = this.getSectionLink(node);
    this.section = sectionObj;
    this.link = linkObj;

    const section = $bookmarksStore.findSection(sectionObj);
    const link = linkObj ? $bookmarksStore.findLink(section, linkObj) : null;

    this.$emit("selected", section, link);
  }

  onAddNode(arg1: any, arg2: any, arg3: any) {
    console.log("onAddNode", arg1, arg2, arg3);
  }

  onDeleteNode(node: any) {
    Debug.log("onDeleteNode", node.name, node.name, node.isLeaf);

    const [sectionObj, linkObj] = this.getSectionLink(node);

    if (this.section?.id == sectionObj.id && this.link?.id == linkObj?.id) {
      this.section = null;
      this.link = null;
      this.$emit("selected", null, null);
    }

    if (node.isLeaf) {
      $bookmarksStore.removeLink(sectionObj, linkObj);
    } else {
      $bookmarksStore.removeSection(sectionObj);
    }
  }

  onDropNode(arg1: any, arg2: any, arg3: any) {
    console.log("onDropNode", arg1, arg2, arg3);
  }

  onDropAfter(arg1: any, arg2: any, arg3: any) {
    console.log("onDropAfter", arg1, arg2, arg3);
  }

  private getSectionLink(node: any) {
    if (node.isLeaf) {
      return [node.parent, node];
    } else {
      return [node, null];
    }
  }

  private prepareTreeLink(link: Link) {
    link = Object.assign({}, link);

    if (!link.id) {
      link.id = uuidv4();
    }

    const linkObj = <any>link;
    linkObj.isLeaf = true;
    linkObj.editNodeDisabled = true;
    return linkObj;
  }

  private prepareTreekSection(section: Section) {
    section = Object.assign({}, section);

    if (!section.id) {
      section.id = uuidv4();
    }

    const sectionObj = <any>section;
    sectionObj.addTreeNodeDisabled = true;

    section.children = section.children.map((link) => {
      return this.prepareTreeLink(link);
    });

    return section;
  }
}
