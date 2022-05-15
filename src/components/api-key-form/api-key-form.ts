import { Component, Vue, Watch } from "vue-property-decorator";

import { $userStoryService } from "@/services/azure-devops/user-story.service";

import ApiKey from "@/support/api-key";
import { Env } from "@/support/environment";
import { $appInsightsService } from "@/services/app-insights/app-insights.service";

@Component
export default class ApiKeyFormComponent extends Vue {
  name: "api-key-form";
  userStoryApiKey: string = ApiKey.getAzureDevOpsApiKey();
  personalAccessTokenUrl = `https://dev.azure.com/${Env.VUE_APP_API_ORGANIZATION}/_usersSettings/tokens`;

  hasAccess = {
    userStory: {
      value: false,
      changed: false,
    },
  };

  get disabled() {
    return !this.userStoryApiKey || this.userStoryApiKey.length <= 10;
  }

  get showUserStoryApiKeyError() {
    return this.hasAccess.userStory.changed && !this.hasAccess.userStory.value;
  }

  @Watch("userStoryApiKey")
  async onUserStoryApiKeyChanged() {
    this.hasAccess.userStory.value = await $userStoryService.checkAccess(
      this.userStoryApiKey
    );
    this.hasAccess.userStory.changed = true;
  }

  created() {
    Debug.setDebugModule("api-key-form", this);

    $userStoryService
      .checkAccess(this.userStoryApiKey)
      .then((value) => (this.hasAccess.userStory.value = value));
  }

  show() {
    $appInsightsService.trackPageView("api-key-form");
    this.$modal.show("api-key-form");
  }

  hide() {
    this.$modal.hide("api-key-form");
  }

  saveApiKey() {
    ApiKey.saveAzureDevOpsApiKey(this.userStoryApiKey);

    this.hide();
  }

  cancel() {
    this.hide();
  }
}
