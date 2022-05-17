<template>
  <div class="bookmarks-editor">
    <add-link-modal
      ref="addLinkModal"
      :section="added.section"
      :link="added.link"
      @save="onSaveAddedLink"
    />

    <link-editor-modal
      ref="linkEditModal"
      :section="selected.section"
      :link="selected.link"
      @changed="onLinkChanged"
    />

    <section-editor-modal
      ref="sectionEditModal"
      :section="selected.section"
      @changed="onSectionChanged"
    />

    <div class="editors">
      <div class="editor-column">
        <h3>Edit Bookmarks</h3>
        <links-tree-editor @selected="onSelected" @add-link="onAddLink" />
      </div>
    </div>

    <div class="footer">
      <button class="btn btn-primary" type="submit" @click="close">Done</button>
    </div>
  </div>
</template>

<style lang="scss" src="./bookmarks-editor.scss"></style>
<script src="./bookmarks-editor.ts"></script>
