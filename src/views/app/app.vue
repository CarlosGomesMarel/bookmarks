<template>
  <div id="app" class="app">
    <div class="header">
      <span></span>

      <button class="btn btn-link" @click="addLink" title="Add link">
        <font-awesome-icon icon="plus" />
      </button>

      <a :href="helpLink" title="Contact Support" target="_blank">
        <font-awesome-icon icon="question" />
      </a>
    </div>

    <div class="app-content">
      <links-editor />
      <links-page />
    </div>
  </div>
</template>

<script src="./app.ts"></script>
<style lang="scss" src="./app.scss"></style>
