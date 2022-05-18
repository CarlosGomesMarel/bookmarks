<template>
  <div class="tree-node">
    <button
      v-if="isLeaf"
      :key="link.id"
      :title="link.href"
      class="btn link"
      role="button"
      @click="onClick"
      :style="{
        backgroundColor: backgroundColor,
        color: color + ' !important',
      }"
    >
      {{ link.name }}
    </button>

    <div v-else class="section">
      <button
        class="btn"
        role="button"
        :style="{
          backgroundColor: backgroundColor,
          color: color + ' !important',
        }"
      >
        #
      </button>

      <h3>{{ link.name }}</h3>
    </div>
  </div>
</template>

<style lang="scss" src="./tree-node.scss"></style>
<script src="./tree-node.ts"></script>
