<template>
  <div id="app" class="app">
    <div class="header">
      <h3>Bookmarks</h3>

      <span></span>

      <a :href="helpLink" title="Contact Support" target="_blank">
        <font-awesome-icon icon="question" />
      </a>
    </div>

    <div class="app-content">
      <links-page />
    </div>
  </div>
</template>

<script src="./app.ts"></script>
<style lang="scss" src="./app.scss"></style>
