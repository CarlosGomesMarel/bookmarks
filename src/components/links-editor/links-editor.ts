/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { v4 as uuidv4 } from "uuid";
import { Component, Prop, Vue } from "vue-property-decorator";

import { VueTreeList, Tree, TreeNode } from "vue-tree-list";

import { $sectionStore, Link } from "@/services/links";

@Component({
  name: "links-editor",
  components: {},
})
export default class LinksEditorComponent extends Vue {
  get sections() {
    return $sectionStore.sections;
  }

  get treeData() {
    this.prepareTreeMembers();
    return new Tree(this.sections);
  }

  created() {
    Debug.setDebugModule("links-editor", this);
    // this.treeData = new Tree(this.sections);
  }

  onChangeName(change: any) {
    if (!change.node) {
      // Completed.
      return;
    }

    const node = change.node;
    Debug.log("onChangeName", node.name, node.isLeaf, node);

    if (node.isLeaf) {
      $sectionStore.updateLink(node.parent, node);
    } else {
      $sectionStore.updateSection(node);
    }
  }

  onClick(node: any) {
    console.log("onClick", node.name, node.id, node.isLeaf);
  }

  onAddNode(arg1: any, arg2: any, arg3: any) {
    console.log("onAddNode", arg1, arg2, arg3);
  }

  onDeleteNode(node: any) {
    Debug.log("onDeleteNode", node.name, node.name, node.isLeaf);

    if (node.isLeaf) {
      $sectionStore.removeLink(node.parent, node);
    } else {
      $sectionStore.removeSection(node);
    }
  }

  onDropNode(arg1: any, arg2: any, arg3: any) {
    console.log("onDropNode", arg1, arg2, arg3);
  }

  onDropAfter(arg1: any, arg2: any, arg3: any) {
    console.log("onDropAfter", arg1, arg2, arg3);
  }

  private prepareTreeMembers() {
    this.sections.forEach((section) => {
      if (!section.id) {
        section.id = uuidv4();
      }

      (<any>section).addTreeNodeDisabled = true;

      section.children.forEach((link) => {
        const before = link.id;
        if (!link.id) {
          link.id = uuidv4();
        }

        (<any>link).isLeaf = true;
      });
    });
  }
}
