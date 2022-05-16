<template>
  <div id="app" class="app">
    <div class="header">
      <span></span>

      <button
        class="btn btn-link"
        @click="showBookmarksEditor"
        title="Show Settings"
      >
        <font-awesome-icon icon="cog" />
      </button>

      <a :href="helpLink" title="Contact Support" target="_blank">
        <font-awesome-icon icon="question" />
      </a>
    </div>

    <div class="app-content">
      <bookmarks-editor v-if="showEditor" @close="onCloseEditor" />
      <bookmarks-page v-else />
    </div>
  </div>
</template>

<script src="./app.ts"></script>
<style lang="scss" src="./app.scss"></style>
