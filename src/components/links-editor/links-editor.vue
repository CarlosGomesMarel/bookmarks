<!--
      @delete-node="onDeleteNode"
      @add-node="onAddNode"
      @drop="onDropNode"
      @drop-after="onDropAfter"
-->
<template>
  <div class="links-editor">
    <vue-tree-list
      @click="onClick"
      @change-name="onChangeName"
      @delete-node="onDeleteNode"
      :model="treeData"
      default-tree-node-name="new node"
      default-leaf-node-name="new leaf"
      :default-expanded="true"
    >
      <template v-slot:leafNameDisplay="slotProps">
        <span>
          {{ slotProps.model.name }}
        </span>
      </template>
      <span class="icon" slot="treeNodeIcon"
        ><font-awesome-icon icon="folder"
      /></span>
      <span class="icon" slot="leafNodeIcon"
        ><font-awesome-icon icon="link"
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

<style lang="scss" src="./links-editor.scss"></style>
<script src="./links-editor.ts"></script>
