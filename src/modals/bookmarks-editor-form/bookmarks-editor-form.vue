<template>
  <div>
    <modal
      height="800"
      width="500"
      :clickToClose="false"
      key="bookmarks-editor-form"
      name="bookmarks-editor-form"
      ref="modal"
    >
      <div class="bookmarks-editor-form">
        <h5>Edit links</h5>
        <links-tree-editor />
      </div>
    </modal>
  </div>
</template>

<style lang="scss" src="./bookmarks-editor-form.scss"></style>
<script src="./bookmarks-editor-form.ts"></script>
