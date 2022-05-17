<template>
  <div>
    <modal
      height="300"
      width="750"
      :clickToClose="true"
      key="section-editor-modal"
      name="section-editor-modal"
      ref="modal"
    >
      <div class="section-editor-modal">
        <h3>Edit Section</h3>
        <section-editor :section="section" @changed="onChanged" />

        <div class="footer">
          <span />
          <span />

          <button class="btn btn-primary" type="submit" @click="hide">
            Done
          </button>
        </div>
      </div>
    </modal>
  </div>
</template>

<style lang="scss" src="./section-editor-modal.scss"></style>
<script src="./section-editor-modal.ts"></script>
