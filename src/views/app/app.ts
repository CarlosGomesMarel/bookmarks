import { Component, Vue } from "vue-property-decorator";

import { EventBus } from "@/support/event-bus";

import { $appInsightsService } from "@/services/app-insights/app-insights.service";

import LinksTreeEditorComponent from "@/modals/bookmarks-editor-form/bookmarks-editor-form.vue";
import LinksPageComponent from "@/components/bookmarks-page/bookmarks-page.vue";
import ColorPickerComponent from "@/components/color-picker/color-picker.vue";

@Component({
  components: {
    "bookmarks-editor-form": LinksTreeEditorComponent,
    "bookmarks-page": LinksPageComponent,
    "color-picker": ColorPickerComponent,
  },
})
export default class AppComponent extends Vue {
  options = {};

  $refs = {
    linksEditorForm: {} as Modal,
  };

  helpLink = `mailto:carlos.gomes@marel.com?subject=Bookmarks Help`;

  created() {
    Debug.setDebugModule("app", this);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $appInsightsService.setVueInstance((this as any).$appInsights);
    $appInsightsService.trackPageView("app");
  }

  mounted() {
    // this.showLinksEditorForm();
  }

  showLinksEditorForm() {
    if (this.$refs.linksEditorForm) {
      this.$refs.linksEditorForm.show();
    }
  }

  hideLinksEditorForm() {
    if (this.$refs.linksEditorForm) {
      this.$refs.linksEditorForm.hide();
    }
  }
}
