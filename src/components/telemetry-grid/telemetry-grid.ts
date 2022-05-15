/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Browser from "@/support/browser";

import TelemetryColumns from "./data/telemetry-columns";
import LocalData from "@/support/local-storage";

import {
  TelemetryDto,
  $statusStore,
  $queryStore,
  DefaultTelemetryDto,
} from "@/services/insights-api";

import EditBugComponent from "@/components/edit-bug/edit-bug.vue";
import EditTextComponent from "@/components/edit-text/edit-text.vue";
import StatusListComponent from "@/components/status/status-list.vue";
import BugEntryForm from "@/components/bug-entry-form/bug-entry-form.vue";
import QuerySelectComponent from "@/components/query-select/query-select.vue";
import AppNamesSelectComponent from "@/components/app-names-select/app-names-select.vue";
import { $insightsApiService } from "@/services/insights-api/insights-api.service";

interface TelemetryModel extends TelemetryDto {
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
  properties: any;
}

@Component({
  components: {
    "bug-entry-form": BugEntryForm,
    "edit-bug": EditBugComponent,
    "edit-text": EditTextComponent,
    "query-select": QuerySelectComponent,
    "app-names-select": AppNamesSelectComponent,
    "status-list": StatusListComponent,
  },
})
export default class TelemetryGridComponent extends Vue {
  name: "telemetry-grid";

  @Prop() private hashCode: number;

  columns = TelemetryColumns;

  limit: number = LocalData.get("telemetry-grid.limit", 100);

  search = "";

  appNamesFilter: string[] = LocalData.get("telemetry-grid.appNamesFilter", []);

  queryFilter: number[] = LocalData.get("telemetry-grid.queryFilter", []);

  defaultSort = LocalData.get("telemetry-grid.defaultSort", {
    prop: "timestamp",
    order: "descending",
  });

  options = {
    showApiKey: Browser.getBoolParam("showApiKey"),
  };

  exportLink: string = null;
  exportBusy: boolean = false;
  editBugRow: TelemetryModel = null;

  refreshBusy: boolean = false;

  $refs = {
    telemetryGrid: {} as any,
    export: {} as any,
    editBugForm: {} as any,
  };

  telemetry: TelemetryModel[] = [];

  get statusFilter() {
    return $statusStore.statusList.map((status) => {
      return {
        text: status.name,
        value: status.name,
      };
    });
  }

  get statusFilterValue(): string[] {
    const savedFilters = LocalData.get("telemetry.filters", {});
    return savedFilters.status?.length ? savedFilters.status : [];
  }

  get tableData() {
    let tableData = this.telemetry;

    if (this.search && this.search.length > 3) {
      tableData = this.filterBySearch(this.search, tableData);
    }

    if (this.appNamesFilter.length) {
      tableData = tableData.filter(
        (item) => this.appNamesFilter.indexOf(item.appName) != -1
      );
    }

    return tableData;
  }

  get dataCount() {
    return this.tableData.length;
  }

  get queryFilterNames() {
    return $queryStore.queryList
      .filter((query) => this.queryFilter.indexOf(query.id) != -1)
      .map((item) => item.name);
  }

  @Watch("limit", { immediate: false })
  onLimitChanged() {
    if (this.limit) {
      setTimeout(() => {
        const limit = LocalData.get("telemetry-grid.limit", -1);
        if (this.limit !== limit) {
          LocalData.saveString("telemetry-grid.limit", this.limit);
          this.onRefresh();
        }
      }, 1000);
    }
  }

  created() {
    Debug.setDebugModule("telemetry-grid", this);
    this.load();
  }

  mounted() {
    // TBD.
  }

  async onRefresh() {
    this.refreshBusy = true;

    await this.load();

    setTimeout(() => {
      this.refreshBusy = false;
    }, 500);
  }

  async onTitleChanged(row: TelemetryModel) {
    // TBD.
  }

  async onStatusChanged(row: TelemetryModel) {
    // TBD.
  }

  private async load() {
    const results = await $insightsApiService.telemetry(
      this.hashCode,
      this.limit
    );
    this.telemetry = results.map((item) => this.convertToModel(item));
  }

  onShowEditBugForm(row: TelemetryModel) {
    this.editBugRow = row;
    this.$refs.editBugForm.show();
  }

  onSortChanged(data: any) {
    LocalData.save("telemetry-grid.defaultSort", {
      prop: data.prop,
      order: data.order,
    });
  }

  async onBugIdChanged(bugId: number, url: string, row: TelemetryModel) {
    row.showEditBug = false;
    this.$refs.editBugForm.hide();
  }

  onFilterChanged(filters: any) {
    const savedFilters = LocalData.get("telemetry.filters", {});

    for (const key in filters) {
      savedFilters[key] = filters[key];
    }

    LocalData.save("telemetry.filters", savedFilters);
  }

  onAppNamesFilterChanged(selected: string[]) {
    this.appNamesFilter = selected;
    LocalData.save("telemetry-grid.appNamesFilter", selected);
  }

  onQueryFilterChanged(selected: number[]) {
    this.queryFilter = selected;
    LocalData.save("telemetry-grid.queryFilter", selected);
  }

  appNamesFilterHandler(value: string, row: any) {
    return row.appName == value;
  }

  statusFilterHandler(value: string, row: any) {
    return row.status == value;
  }

  filterHandler(value: string, row: any, column: any) {
    const property = column["property"];
    const data = row[property];
    return data;
  }

  exportToCsv() {
    if (this.tableData?.length == 0) return;

    this.exportBusy = true;

    const model: TelemetryDto = Object.assign({}, DefaultTelemetryDto);

    const fields = Object.keys(model).filter((item) => {
      switch (item) {
        case "jsonData":
        case "titleMessage":
          return false;
        default:
          return true;
      }
    });

    const replacer = (key: string, value: any) =>
      key == "busy" || value === null ? "" : value;

    const csv = this.tableData.map((row) =>
      fields
        .map((fieldName) => JSON.stringify((<any>row)[fieldName], replacer))
        .join(",")
    );
    csv.unshift(fields.join(","));

    const csvContent = "data:text/csv;charset=utf-8," + csv.join("\r\n");

    this.exportLink = csvContent;

    setTimeout(() => {
      this.exportBusy = false;
    }, 1000);
  }

  private convertToModel(telemetry: TelemetryDto) {
    const model: TelemetryModel = <TelemetryModel>telemetry;
    model.timestampStr = telemetry.timestamp.toLocaleString().replace(",", "");
    model.selected = false;
    model.saving = false;
    model.disabled = false;
    model.showEditTitle = false;
    model.showEditBug = false;
    model.titleMessage = model.name;

    model.properties = {
      itemId: model.itemId,
      name: model.name,
      message: model.message,
      additionalMessage: model.additionalMessage,
      context: model.context,
      role: model.cloudRoleName,
      operation: model.operationName,
      hashCode: model.hashCode,
      appName: model.appName,
      props: model.jsonData,
    };

    //this.applyStatusClassName(model);

    return model;
  }

  private filterBySearch(search: string, tableData: TelemetryModel[]) {
    search = search.toLowerCase();

    return tableData.filter((item) => {
      if (item.name && item.name.toLowerCase().indexOf(search) != -1) {
        return true;
      }

      if (
        item.operationName &&
        item.operationName.toLowerCase().indexOf(search) != -1
      ) {
        return true;
      }

      if (item.message && item.message.toLowerCase().indexOf(search) != -1) {
        return true;
      }

      if (
        item.additionalMessage &&
        item.additionalMessage.toLowerCase().indexOf(search) != -1
      ) {
        return true;
      }

      if (
        item.cloudRoleName &&
        item.cloudRoleName.toLowerCase().indexOf(search) != -1
      ) {
        return true;
      }

      return false;
    });
  }
}
