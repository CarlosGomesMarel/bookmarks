<template>
  <div class="bookmarks-page">
    <div v-if="showRecentLinks" class="recent-bookmarks-page">
      <h3>Recent Links</h3>
      <div class="link-wrapper">
        <template v-for="(link, index) in recentLinks">
          <div class="link-container" :key="'recent-links-link-' + index">
            <link-form :link="link" />
          </div>
        </template>
      </div>
    </div>

    <template v-for="(section, sectionIdx) in bookmarks">
      <h3 :key="'section-' + sectionIdx">{{ section.name }}</h3>
      <div class="link-wrapper" :key="'section-wrapper-' + sectionIdx">
        <template v-for="(link, index) in section.children">
          <div
            class="link-container"
            :key="'section-' + sectionIdx + '-link-' + index"
          >
            <link-form :link="link" />
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<style lang="scss" src="./bookmarks-page.scss"></style>
<script src="./bookmarks-page.ts"></script>
