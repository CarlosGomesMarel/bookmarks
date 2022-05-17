<template>
  <div class="bookmarks-editor">
    <add-link-modal
      ref="addLinkModal"
      :section="added.section"
      :link="added.link"
    />

    <div class="editors">
      <div class="editor-column">
        <h3>Edit Bookmarks</h3>
        <links-tree-editor @selected="onSelected" @add-link="onAddLink" />
      </div>

      <div v-if="selected.link" class="editor-column">
        <h3>Edit link</h3>
        <link-editor
          :section="selected.section"
          :link="selected.link"
          @changed="onLinkChanged"
        />
      </div>
      <div v-else-if="selected.section" class="editor-column">
        <h3>Edit section</h3>
        <section-editor
          :section="selected.section"
          @changed="onSectionChanged"
        />
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
