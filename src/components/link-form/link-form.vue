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
      >{{ link.name }}</a
    >
    <button
      class="btn btn-link edit-link-btn"
      @click="editLink"
      title="Edit link"
    >
      <font-awesome-icon icon="edit" />
    </button>
  </div>
</template>

<style lang="scss" src="./link-form.scss"></style>
<script src="./link-form.ts"></script>
