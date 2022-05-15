<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="telemetry">
    <div class="header">
      <router-link to="/" title="Insights Monitor">
        <div class="link-icon">
          <span><font-awesome-icon icon="home" size="2x" /></span>
        </div>
      </router-link>

      <span class="title">Telemetry</span>
    </div>
    <telemetry-grid :hashCode="hashCode"></telemetry-grid>
  </div>
</template>

<script src="./telemetry.ts"></script>
<style lang="scss" src="./telemetry.scss"></style>
