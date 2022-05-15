<template>
  <div>
    <modal
      height="800"
      width="500"
      :clickToClose="false"
      key="links-editor-form"
      name="links-editor-form"
      ref="modal"
    >
      <div class="links-editor-form">
        <h5>Edit links</h5>
        <links-editor />
      </div>
    </modal>
  </div>
</template>

<style lang="scss" src="./links-editor-form.scss"></style>
<script src="./links-editor-form.ts"></script>
