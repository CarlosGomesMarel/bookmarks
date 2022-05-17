<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="home" class="home">
    <div class="header">
      <span></span>

      <input
        name="filter"
        v-model="filter"
        placeholder="Search bookmarks"
        class="form-control"
        autocomplete="on"
        type="text"
      />

      <span></span>

      <button
        class="btn btn-link manage-bookmarks"
        @click="showBookmarksEditor"
        title="Manage bookmarks"
      >
        <font-awesome-icon icon="edit" size="2x" />
        Manage Bookmarks
      </button>

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

      <a :href="helpLink" title="Contact Support" target="_blank">
        <font-awesome-icon icon="question" />
        Help
      </a>
    </div>

    <div class="home-content">
      <bookmarks-editor v-if="showEditor" @close="onCloseEditor" />
      <bookmarks-page :filter="filter" v-else />
    </div>
  </div>
</template>

<script src="./home.ts"></script>
<style lang="scss" src="./home.scss"></style>
