<template>
  <div class="link-editor">
    <form class="link-editor-form" action="javascript:void(0);">
      <label for="name">Name</label>
      <input
        name="name"
        v-model="link.name"
        placeholder="Bookmark name"
        class="form-control"
        autocomplete="on"
        type="text"
      />

      <span title="Invalid Name">
        <font-awesome-icon v-show="showNameError" icon="exclamation-triangle" />
      </span>

      <label for="name">Url</label>
      <input
        name="url"
        v-model="link.href"
        placeholder="Url"
        class="form-control"
        autocomplete="on"
        type="text"
      />

      <span title="Invalid Url">
        <font-awesome-icon v-show="showUrlError" icon="exclamation-triangle" />
      </span>

      <label for="name">Color</label>
      <color-picker :section="section" :link="link" @changed="onLinkChanged" />

      <!-- TODO: tags -->
    </form>
  </div>
</template>

<style lang="scss" src="./link-editor.scss"></style>
<script src="./link-editor.ts"></script>
