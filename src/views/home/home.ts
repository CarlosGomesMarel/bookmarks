/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Vue } from "vue-property-decorator";

import { $appInsightsService } from "@/services/app-insights/app-insights.service";
import { $bookmarksStore, Section } from "@/services/bookmarks";

import BookmarksEditorComponent from "@/components/bookmarks-editor/bookmarks-editor.vue";
import LinksPageComponent from "@/components/bookmarks-page/bookmarks-page.vue";

@Component({
  components: {
    "bookmarks-editor": BookmarksEditorComponent,
    "bookmarks-page": LinksPageComponent,
  },
})
export default class HomeComponent extends Vue {
  options = {};

  filter: string = null;
  exportLink: string = null;

  $refs = {
    export: {} as any,
    file: {} as any,
  };

  helpLink = `mailto:carlos.gomes@marel.com?subject=Bookmarks Help`;

  showEditor = false;

  created() {
    Debug.setDebugModule("home", this);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $appInsightsService.setVueInstance((this as any).$appInsights);
    $appInsightsService.trackPageView("home");
  }

  showBookmarksEditor() {
    this.showEditor = true;
  }

  onCloseEditor() {
    this.showEditor = false;
  }

  exportToJson() {
    const sections = <Section[]>(
      JSON.parse(JSON.stringify($bookmarksStore.sections))
    );
    if (sections.length == 0) return;

    const json = encodeURIComponent(
      JSON.stringify(
        sections,
        (key, value) => {
          if (key == "id" || key == "timestamp") {
            return undefined;
          }

          return value;
        },
        3
      )
    );
    const exportContent = "data:text/json;charset=utf-8," + json;
    this.exportLink = exportContent;
  }

  importBookmarks() {
    if (!this.$refs.file?.files?.length) return;

    const file = this.$refs.file.files[0];
    const reader = new FileReader();
    reader.onload = (response) => {
      const contents = response.target.result;
      const [result, message] = $bookmarksStore.loadFromJson(
        contents as string
      );

      if (result) {
        this.$toast.success("Imported bookmarks");
      } else {
        this.$toast.error(message);
      }
    };
    reader.readAsText(file);
  }

  toggleHomePage() {
    this.showEditor = !this.showEditor;
  }
}
