/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventBus } from "@/support/event-bus";
import Vue from "vue";
import { $userStoryService } from "../azure-devops/user-story.service";
import { $insightsApiService } from "./insights-api.service";
import { InvestigationDto } from "./models/investigation.model";
import { $statusStore } from "./status.store";

export interface InvestigationModel extends InvestigationDto {
  timestampStr: string;
  selected: boolean;
  saving: boolean;
  disabled: boolean;
  statusClassName: string;
  issueCountStr: string;
  titleMessage: string;
  showNameAsTitle: boolean;
  showEditTitle: boolean;
  showEditBug: boolean;
  original: {
    notes: string;
    title: string;
    bugId: number;
  };
  properties: any;
}

interface InvestigationState {
  investigationList: InvestigationModel[];
}

class InvestigationStore {
  private state = Vue.observable<InvestigationState>({
    investigationList: [],
  });

  get investigationList() {
    return this.state.investigationList;
  }

  constructor() {
    EventBus.Instance.$on(EventBus.UserStoryApiKeyChanged, () => {
      this.updateBugInformation(this.investigationList);
    });
  }

  async load() {
    const investigations = await $insightsApiService.investigations();
    const investigationList = investigations.map((investigation) =>
      this.convertToModel(investigation)
    );

    this.updateBugInformation(investigationList);

    this.state.investigationList.splice(
      0,
      this.investigationList.length,
      ...investigationList
    );

    EventBus.Instance.$emit(EventBus.InvestigationsLoaded, true);
  }

  private updateBugInformation(investigationList: InvestigationModel[]) {
    investigationList.forEach((investigation) => {
      this.updateBugData(investigation);
    });
  }

  async saveInvestigation(row: InvestigationModel) {
    const results = await $insightsApiService.saveInvestigation(row);
    Debug.log("Saved investigation", results);

    results.forEach((investigation) => {
      const found = this.investigationList.find(
        (item) => item.id == investigation.id
      );
      if (!found) {
        Debug.error(
          `Missing investigation for ${investigation.id}`,
          investigation
        );
        return;
      }

      Object.assign(found, investigation);
      this.applyStatusClassName(found);
    });
  }

  private convertToModel(investigation: InvestigationDto) {
    const model: InvestigationModel = <InvestigationModel>investigation;
    model.timestampStr = investigation.timestamp
      .toLocaleString()
      .replace(",", "");
    model.selected = false;
    model.saving = false;
    model.disabled = false;
    model.issueCountStr = model.issueCount.toLocaleString("en-US");
    model.showEditTitle = false;
    model.showEditBug = false;
    model.showNameAsTitle = !model.title;
    model.titleMessage = model.title || model.name;
    model.original = {
      notes: model.notes,
      title: model.title,
      bugId: model.bugId,
    };

    model.properties = {
      itemId: model.itemId,
      name: model.name,
      message: model.message,
      additionalMessage: model.additionalMessage,
      context: model.context,
      role: model.cloudRoleName,
      operation: model.operationName,
      hashCode: model.hashCode,
      query: model.query,
      appName: model.appName,
      props: model.jsonData,
    };

    this.applyStatusClassName(model);

    return model;
  }

  private applyStatusClassName(model: InvestigationModel) {
    if (model.bugId) {
      model.statusClassName = "has-bug";
      return;
    }

    const statusModel = $statusStore.statusList.find(
      (item) => item.id == model.statusId
    );
    model.statusClassName = statusModel?.className;
  }

  private async updateBugData(investigation: InvestigationModel) {
    if (investigation.bugId) {
      const workItem = await $userStoryService.getUserStory(
        investigation.bugId
      );

      if (workItem) {
        investigation.bugUrl = workItem.url;
        investigation.bugStatus = workItem.state;
        return;
      }
    }

    investigation.bugUrl = null;
    investigation.bugStatus = null;
  }
}

export const $investigationStore = new InvestigationStore();
Debug.setDebugModule("investigationStore", $investigationStore);
