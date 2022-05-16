<template>
  <div id="app" class="app">
    <bookmarks-editor-form ref="linksEditorForm" />

    <div class="header">
      <span></span>

      <button
        class="btn btn-link"
        @click="showLinksEditorForm"
        title="Show Settings"
      >
        <font-awesome-icon icon="cog" />
      </button>

      <a :href="helpLink" title="Contact Support" target="_blank">
        <font-awesome-icon icon="question" />
      </a>
    </div>

    <div class="app-content">
      <bookmarks-page />
    </div>
  </div>
</template>

<script src="./app.ts"></script>
<style lang="scss" src="./app.scss"></style>
