<template>
  <div>
    <modal
      height="400"
      width="750"
      :clickToClose="true"
      key="link-editor-modal"
      name="link-editor-modal"
      ref="modal"
    >
      <div class="link-editor-modal">
        <h3>Edit link</h3>
        <link-editor :section="section" :link="link" @changed="onChanged" />

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

<style lang="scss" src="./link-editor-modal.scss"></style>
<script src="./link-editor-modal.ts"></script>
