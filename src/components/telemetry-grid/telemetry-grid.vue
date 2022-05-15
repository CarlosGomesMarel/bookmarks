<template>
  <div class="telemetry-grid">
    <bug-entry-form
      :row="editBugRow"
      ref="editBugForm"
      @changed="onBugIdChanged"
    />

    <div class="search-row">
      <el-input
        v-model="search"
        size="small"
        placeholder="Type to search"
        class="search"
      />

      <app-names-select
        :selected="appNamesFilter"
        @changed="onAppNamesFilterChanged"
      />

      <button
        style="display: none"
        class="btn btn-plain"
        :title="'Refresh ' + telemetry.length + ' row(s)'"
        @click="onRefresh"
      >
        <font-awesome-icon icon="refresh" />

        <font-awesome-icon v-show="refreshBusy" icon="spinner" spin />
      </button>

      <a
        style="display: none"
        v-on:mousedown="exportToCsv()"
        :href="exportLink"
        class="btn btn-default"
        :class="{ 'anchor-disabled': !dataCount }"
        :disabled="dataCount == 0"
        download="insights-monitor.csv"
        id="export-to-csv"
        :title="'Export ' + dataCount + ' row(s)'"
        ref="export"
      >
        <font-awesome-icon icon="file-export" />
        Export {{ dataCount }} rows
      </a>

      <span>&nbsp;&nbsp;&nbsp; Number of rows:</span>

      <el-input
        v-model="limit"
        size="small"
        placeholder="Enter number of rows to return"
        class="limit"
      />
    </div>

    <el-table
      :data="tableData"
      size="large"
      :default-sort="defaultSort"
      :highlight-current-row="true"
      :highlightCurrentRow="true"
      @filter-change="onFilterChanged"
      @sort-change="onSortChanged"
    >
      <el-table-column type="selection" width="30"> </el-table-column>

      <el-table-column type="expand" width="15px" class="expand-column">
        <template slot-scope="scope">
          <div class="expand-row">
            <div>
              <span class="label">Properties:</span>
              <pre>{{ scope.row.properties }}</pre>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        prop="timestamp"
        column-key="timestamp"
        label="Timestamp"
        width="100rem"
        sortable
      >
        <template slot-scope="scope">
          <span class="timestamp">
            {{ scope.row.timestampStr }}
          </span>
        </template>
      </el-table-column>

      <el-table-column
        prop="title"
        column-key="title"
        label="Title"
        width="280rem"
        sortable
      >
        <template slot-scope="scope">
          <edit-text
            :value="scope.row.titleMessage"
            :id="scope.row.id"
            :row="scope.row"
            :showEdit="scope.row.showEditTitle"
            :className="scope.row.statusClassName"
            :onChanged="onTitleChanged"
            :onValueChanged="(value, row) => (row.titleMessage = value)"
            :onShowEdit="(value, row) => (row.showEditTitle = value)"
          />
        </template>
      </el-table-column>

      <el-table-column
        prop="message"
        column-key="message"
        label="Message"
        sortable
      >
        <template slot-scope="scope">
          <div class="message-column">
            <span
              :title="scope.row.message"
              class="message"
              :class="scope.row.statusClassName"
            >
              {{ scope.row.message }}
            </span>

            <span
              :title="scope.row.context"
              class="message"
              :class="scope.row.statusClassName"
            >
              {{ scope.row.additionalMessage }}
            </span>

            <span
              :title="scope.row.context"
              class="message"
              :class="scope.row.statusClassName"
            >
              {{ scope.row.context }}
            </span>
          </div>
        </template>
      </el-table-column>

      <el-table-column
        prop="operationName"
        label="Operation"
        width="200"
        sortable
      >
      </el-table-column>

      <el-table-column prop="cloudRoleName" label="Role" width="150" sortable>
      </el-table-column>
    </el-table>
  </div>
</template>

<script src="./telemetry-grid.ts"></script>
<style lang="scss" src="./telemetry-grid.scss"></style>
