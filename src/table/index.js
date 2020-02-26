import Vue from "vue";

import Table from './src/table/table';
Vue.component(Table.name, Table);

import TableColumn from './src/table-column/table-column';
Vue.component(TableColumn.name, TableColumn);

import TableCellString from './src/table-cell/types/table-cell-string';
Vue.component(TableCellString.name, TableCellString);

import TableCellBoolean from './src/table-cell/types/table-cell-boolean';
Vue.component(TableCellBoolean.name, TableCellBoolean);

import TableCellDatetime from './src/table-cell/types/table-cell-datetime';
Vue.component(TableCellDatetime.name, TableCellDatetime);

import TableCellOption from './src/table-cell/types/table-cell-option';
Vue.component(TableCellOption.name, TableCellOption);

import TableCellImage from './src/table-cell/types/table-cell-image';
Vue.component(TableCellImage.name, TableCellImage);

import TableFilterString from './src/table-filter/types/table-filter-string';
Vue.component(TableFilterString.name, TableFilterString);

import TableFilterBoolean from './src/table-filter/types/table-filter-boolean';
Vue.component(TableFilterBoolean.name, TableFilterBoolean);

import TableFilterDatetime from './src/table-filter/types/table-filter-datetime';
Vue.component(TableFilterDatetime.name, TableFilterDatetime);

import TableFilterOption from './src/table-filter/types/table-filter-option';
Vue.component(TableFilterOption.name, TableFilterOption);
