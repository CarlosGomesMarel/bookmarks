<template>
  <div class="link-form">
    <a
      target="_self"
      :id="link.id"
      :key="link.id"
      :href="link.href"
      :title="link.href"
      class="btn link-url"
      role="button"
      :style="{
        backgroundColor: link.background,
        color: link.color + ' !important',
      }"
      >{{ link.name }}
    </a>

    <div class="edit-link-btn">
      <button class="btn btn-link" @click="pinLink" title="Pin">
        <font-awesome-icon icon="thumbtack" />
      </button>

      <button class="btn btn-link" @click="editLink" title="Edit link">
        <font-awesome-icon icon="edit" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" src="./link-form.scss"></style>
<script src="./link-form.ts"></script>
