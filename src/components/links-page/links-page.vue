<template>
  <div class="links-page">
    <template v-for="(section, sectionIdx) in sections">
      <h3 :key="'section-' + sectionIdx">{{ section.name }}</h3>
      <div class="link-wrapper" :key="'section-wrapper-' + sectionIdx">
        <template v-for="(link, index) in section.links">
          <div
            class="link-container"
            :key="'section-' + sectionIdx + '-link-' + index"
          >
            <link-form :link="link" @changed="onLinkChanged" />
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<style lang="scss" src="./links-page.scss"></style>
<script src="./links-page.ts"></script>
