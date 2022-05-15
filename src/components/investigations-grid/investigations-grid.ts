/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Vue } from "vue-property-decorator";
import Browser from "@/support/browser";

import InvestigationColumns from "./data/investigation-columns";
import LocalData from "@/support/local-storage";

import {
  InvestigationDto,
  $statusStore,
  $queryStore,
  StatusModel,
  DefaultInvestigationDto,
} from "@/services/insights-api";

import EditBugComponent from "@/components/edit-bug/edit-bug.vue";
import EditTextComponent from "@/components/edit-text/edit-text.vue";
import StatusListComponent from "@/components/status/status-list.vue";
import BugEntryForm from "@/components/bug-entry-form/bug-entry-form.vue";
import QuerySelectComponent from "@/components/query-select/query-select.vue";
import AppNamesSelectComponent from "@/components/app-names-select/app-names-select.vue";
import {
  $investigationStore,
  InvestigationModel,
} from "@/services/insights-api/investigation.store";
import { EventBus } from "@/support/event-bus";

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
export default class InvestigationsGridComponent extends Vue {
  name: "investigations-grid";

  columns = InvestigationColumns;

  search = "";

  appNamesFilter: string[] = LocalData.get(
    "investigation-grid.appNamesFilter",
    []
  );

  queryFilter: number[] = LocalData.get("investigation-grid.queryFilter", []);

  defaultSort = LocalData.get("investigation-grid.defaultSort", {
    prop: "timestamp",
    order: "descending",
  });

  options = {
    showApiKey: Browser.getBoolParam("showApiKey"),
  };

  exportLink: string = null;
  exportBusy: boolean = false;
  editBugRow: InvestigationModel = null;

  refreshBusy: boolean = true;

  $refs = {
    investigationsGrid: {} as any,
    export: {} as any,
    editBugForm: {} as any,
  };

  get investigations() {
    return $investigationStore.investigationList;
  }

  get statusFilter() {
    return $statusStore.statusList.map((status) => {
      return {
        text: status.name,
        value: status.name,
      };
    });
  }

  get statusFilterValue(): string[] {
    const savedFilters = LocalData.get("investigation.filters", {});
    return savedFilters.status?.length ? savedFilters.status : [];
  }

  get tableData() {
    let tableData = this.investigations;

    if (this.search && this.search.length > 3) {
      tableData = this.filterBySearch(this.search, tableData);
    }

    if (this.appNamesFilter.length) {
      tableData = tableData.filter(
        (item) => this.appNamesFilter.indexOf(item.appName) != -1
      );
    }

    const queryFilterNames = this.queryFilterNames;
    if (queryFilterNames.length) {
      tableData = tableData.filter(
        (item) => queryFilterNames.indexOf(item.query) != -1
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

  created() {
    Debug.setDebugModule("investigations-grid", this);

    EventBus.Instance.$on(EventBus.InvestigationsLoaded, async () => {
      this.refreshBusy = false;
    });

    $investigationStore.load();
  }

  async onRefresh() {
    this.refreshBusy = true;
    await $investigationStore.load();

    setTimeout(() => {
      this.refreshBusy = false;
    }, 500);
  }

  async onStatusChanged(status: StatusModel, row: InvestigationModel) {
    row.statusId = status.id;
    row.status = status.name;
    await this.saveInvestigation(row);
  }

  onShowEditBugForm(row: InvestigationModel) {
    this.editBugRow = row;
    this.$refs.editBugForm.show();
  }

  onSortChanged(data: any) {
    LocalData.save("investigation-grid.defaultSort", {
      prop: data.prop,
      order: data.order,
    });
  }

  async onBugIdChanged(bugId: number, url: string, row: InvestigationModel) {
    row.showEditBug = false;
    this.$refs.editBugForm.hide();

    if (
      row.bugId !== bugId ||
      row.bugUrl != url ||
      row.original.bugId !== bugId
    ) {
      row.bugId = bugId;
      row.bugUrl = url;

      if (
        row.bugId &&
        $statusStore.newStatus &&
        $statusStore.investigatedStatus
      ) {
        if (row.statusId == $statusStore.newStatus.id) {
          row.statusId = $statusStore.investigatedStatus.id;
        }
      }

      await this.saveInvestigation(row);
    }
  }

  onFilterChanged(filters: any) {
    const savedFilters = LocalData.get("investigation.filters", {});

    for (const key in filters) {
      savedFilters[key] = filters[key];
    }

    LocalData.save("investigation.filters", savedFilters);
  }

  async onNotesChanged(row: InvestigationModel) {
    if (row.notes != row.original.notes) {
      await this.saveInvestigation(row);
    }
  }

  onAppNamesFilterChanged(selected: string[]) {
    this.appNamesFilter = selected;
    LocalData.save("investigation-grid.appNamesFilter", selected);
  }

  onQueryFilterChanged(selected: number[]) {
    this.queryFilter = selected;
    LocalData.save("investigation-grid.queryFilter", selected);
  }

  async onTitleChanged(row: InvestigationModel) {
    row.showEditTitle = false;

    if (
      row.titleMessage != row.original.title &&
      row.titleMessage != row.name
    ) {
      row.title = row.titleMessage;
      await this.saveInvestigation(row);
    }
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

    const model: InvestigationDto = Object.assign({}, DefaultInvestigationDto);

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

  async saveInvestigation(row: InvestigationModel) {
    await $investigationStore.saveInvestigation(row);
  }

  private filterBySearch(search: string, tableData: InvestigationModel[]) {
    search = search.toLowerCase();

    return tableData.filter((item) => {
      if (item.name && item.name.toLowerCase().indexOf(search) != -1) {
        return true;
      }

      if (item.title && item.title.toLowerCase().indexOf(search) != -1) {
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
        item.bugId &&
        item.bugId.toString().toLowerCase().indexOf(search) != -1
      ) {
        return true;
      }

      return false;
    });
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
}
