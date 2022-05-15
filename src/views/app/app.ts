import { Component, Vue } from "vue-property-decorator";

import { EventBus } from "@/support/event-bus";

import { $appInsightsService } from "@/services/app-insights/app-insights.service";

import LinksEditorComponent from "@/modals/links-editor-form/links-editor-form.vue";
import LinksPageComponent from "@/components/links-page/links-page.vue";

@Component({
  components: {
    "links-editor-form": LinksEditorComponent,
    "links-page": LinksPageComponent,
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
    this.showLinksEditorForm();
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
