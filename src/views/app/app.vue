<template>
  <div id="app" class="app">
    <div class="header">
      <span></span>

      <a
        v-on:mousedown="exportToJson()"
        :href="exportLink"
        class="btn btn-default"
        download="bookmarks.json"
        id="export-to-json"
        title="Export bookmarks"
        ref="export"
      >
        <font-awesome-icon icon="file-export" />
        Export Bookmarks
      </a>

      <div>
        <input
          type="file"
          ref="file"
          style="display: none"
          @change="importBookmarks($event)"
        />
        <button class="btn btn-link" @click="$refs.file.click()">
          <font-awesome-icon icon="file-import" />
          Import Bookmarks
        </button>
      </div>

      <button
        class="btn btn-link"
        @click="showBookmarksEditor"
        title="Manage bookmarks"
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
