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

      <div class="instructions">
        <h3>Instructions</h3>
        <p>
          To add a new bookmark. Hover over the parent section.
          <br />
          Click the plus button to bring up the editor. Click save to when done.
          <br />
          <br />

          To change a link. Navigate to the link and click on it to display the
          editor.
          <br />
          Make your changes and click done. Click anywhere to dismiss the
          editor.
          <br />
          <br />

          To delete a link or section, hover over the item and click the trash
          icon.
          <br />
          <br />

          When completed click the Done button at the bottom.
          <br />
          <br />
        </p>
      </div>
    </div>

    <div class="footer">
      <button class="btn btn-primary" type="submit" @click="close">Done</button>
    </div>
  </div>
</template>

<style lang="scss" src="./bookmarks-editor.scss"></style>
<script src="./bookmarks-editor.ts"></script>
