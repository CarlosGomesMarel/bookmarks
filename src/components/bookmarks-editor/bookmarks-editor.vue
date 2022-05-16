<template>
  <div class="bookmarks-editor">
    <div class="editors">
      <div class="editor-column">
        <h3>Edit Bookmarks</h3>
        <links-tree-editor @selected="onSelected" />
      </div>

      <div v-if="link" class="editor-column">
        <h3>Edit link</h3>
        <link-editor :section="section" :link="link" @changed="onLinkChanged" />
      </div>
      <div v-else class="editor-column">
        <!-- no selection -->
      </div>
    </div>

    <div class="footer">
      <button class="btn btn-primary" type="submit" @click="close">Done</button>
    </div>
  </div>
</template>

<style lang="scss" src="./bookmarks-editor.scss"></style>
<script src="./bookmarks-editor.ts"></script>
