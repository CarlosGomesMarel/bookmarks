import { EventBus } from "@/support/event-bus";

const ApiKeyNames = {
  AzureDevOps: "ApiKey-AzureDevOps",
};

export default class ApiKey {
  static getAzureDevOpsApiKey() {
    //if (window.localStorage) return null;

    return window.localStorage.getItem(ApiKeyNames.AzureDevOps);
  }

  static saveAzureDevOpsApiKey(value: string) {
    window.localStorage.setItem(ApiKeyNames.AzureDevOps, value);
    EventBus.Instance.$emit(EventBus.UserStoryApiKeyChanged, value);
  }
}

Debug.setDebugModule("apiKey", ApiKey);
