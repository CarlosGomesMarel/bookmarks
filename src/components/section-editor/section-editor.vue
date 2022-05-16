<template>
  <div class="section-editor">
    <form class="section-editor-form" action="javascript:void(0);">
      <label for="name">Name</label>
      <input
        name="name"
        v-model="section.name"
        placeholder="Section name"
        class="form-control"
        autocomplete="on"
        type="text"
      />

      <span title="Invalid Name">
        <font-awesome-icon v-show="showNameError" icon="exclamation-triangle" />
      </span>

      <label for="name">Color</label>
      <color-picker :link="section" @changed="onSectionChanged" />

      <!-- TODO: tags -->
    </form>
  </div>
</template>

<style lang="scss" src="./section-editor.scss"></style>
<script src="./section-editor.ts"></script>
