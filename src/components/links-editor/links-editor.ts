// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { Component, Prop, Vue } from "vue-property-decorator";

import { VueTreeList, Tree, TreeNode } from "vue-tree-list";

import { Link } from "@/services/links";

@Component({
  name: "links-editor",
  components: {},
})
export default class LinksEditorComponent extends Vue {
  data = new Tree([
    {
      name: "Section 1",
      id: 1000,
      addTreeNodeDisabled: true,
      children: [
        {
          name: "Node 1 - 1",
          id: 1001,
          isLeaf: true,
        },
        {
          name: "Node 1 - 2",
          id: 1002,
          isLeaf: true,
        },
        {
          name: "Node 1 - 3",
          id: 1003,
          isLeaf: true,
        },
      ],
    },
    {
      name: "Section 2",
      id: 2000,
      addTreeNodeDisabled: true,
      children: [
        {
          name: "Node 2 - 1",
          id: 2001,
          isLeaf: true,
        },
        {
          name: "Node 2 - 2",
          id: 2002,
          isLeaf: true,
        },
      ],
    },
    {
      name: "Section 3",
      id: 3000,
      addTreeNodeDisabled: true,
      children: [],
    },
  ]);

  created() {
    Debug.setDebugModule("links-editor", this);
  }

  onChangeName() {
    // TODO:
  }

  onClick() {
    // TODO:
  }

  onAddNode() {
    // TODO:
  }

  onDeleteNode() {
    // TODO:
  }
}
