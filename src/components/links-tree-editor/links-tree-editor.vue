<!--
      @delete-node="onDeleteNode"
      @add-node="onAddNode"
      @drop="onDropNode"
      @drop-after="onDropAfter"
-->
<template>
  <div class="links-tree-editor">
    <vue-tree-list
      @drop="onDropNode"
      @drop-after="onDropAfter"
      @drop-before="onDropBefore"
      @click="onClick"
      @delete-node="onDeleteNode"
      @add-node="onAddNode"
      :model="treeData"
      default-tree-node-name="New Section"
      default-leaf-node-name="New Bookmark"
      :default-expanded="true"
    >
      <template v-slot:leafNameDisplay="slotProps">
        <link-node
          @click="onClick(slotProps.model)"
          :link="slotProps.model"
          :section="slotProps.model.parent"
        />
      </template>
      <span class="icon" slot="treeNodeIcon"
        ><font-awesome-icon icon="folder"
      /></span>
      <span class="icon" slot="leafNodeIcon"
        ><font-awesome-icon icon="link"
      /></span>
      <span class="icon" slot="delNodeIcon"
        ><font-awesome-icon icon="trash"
      /></span>
      <span class="icon" slot="editNodeIcon"
        ><font-awesome-icon icon="edit"
      /></span>
      <span class="icon" slot="addLeafNodeIcon"
        ><font-awesome-icon icon="plus"
      /></span>
      <!--
      <span class="icon" slot="addTreeNodeIcon">📂</span>
      <span class="icon" slot="addLeafNodeIcon">＋</span>
      <span class="icon" slot="editNodeIcon">📃</span>
      <span class="icon" slot="delNodeIcon">✂️</span>
      <span class="icon" slot="leafNodeIcon">🍃</span>
      <span class="icon" slot="treeNodeIcon">🌲</span>
      -->
    </vue-tree-list>
  </div>
</template>

<style lang="scss" src="./links-tree-editor.scss"></style>
<script src="./links-tree-editor.ts"></script>
