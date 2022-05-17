<template>
  <div>
    <modal
      height="300"
      width="500"
      :clickToClose="true"
      key="add-link-modal"
      name="add-link-modal"
      ref="modal"
    >
      <div class="add-link-modal">
        <h1>Add Link</h1>
        <form class="input-form" action="javascript:void(0);">
          <label for="name">Name</label>
          <input
            name="name"
            placeholder="Bookmark name"
            class="form-control"
            autocomplete="on"
            type="text"
          />

          <span title="Invalid Name">
            <font-awesome-icon
              v-show="showNameError"
              icon="exclamation-triangle"
            />
          </span>

          <label for="name">Url</label>
          <input
            name="url"
            v-model="href"
            placeholder="Url"
            class="form-control"
            autocomplete="on"
            type="text"
          />

          <span title="Invalid Url">
            <font-awesome-icon
              v-show="showUrlError"
              icon="exclamation-triangle"
            />
          </span>

          <label for="name">Color</label>
          <color-picker :link="link" @changed="onColorChanged" />
          <span></span>

          <!-- TODO: tags -->
        </form>

        <div class="footer">
          <span />
          <button class="btn btn-default" type="cancel" @click="cancel">
            Cancel
          </button>

          <button
            class="btn btn-primary"
            type="submit"
            :disabled="disabled"
            @click="save"
          >
            Save
          </button>
        </div>
      </div>
    </modal>
  </div>
</template>

<style lang="scss" src="./add-link-modal.scss"></style>
<script src="./add-link-modal.ts"></script>
