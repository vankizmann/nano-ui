import NTable from "./js/table/NTable.js";
import NTableColumn from "./js/table-column/NTableColumn.js";

export default function (App) {
    App.component(NTable.name, NTable);
    App.component(NTableColumn.name, NTableColumn);
}

import NTableCellString from "./js/table-cell/NTableCellString.js";
import NTableCellBoolean from "./js/table-cell/NTableCellBoolean.js";
import NTableCellDatetime from "./js/table-cell/NTableCellDatetime.js";
import NTableCellOption from "./js/table-cell/NTableCellOption.js";
import NTableCellSelect from "./js/table-cell/NTableCellSelect.js";
import NTableCellMatrix from "./js/table-cell/NTableCellMatrix.js";

globalThis.NTableCells = {
    'string': NTableCellString,
    'boolean': NTableCellBoolean,
    'datetime': NTableCellDatetime,
    'option': NTableCellOption,
    'select': NTableCellSelect,
    'matrix': NTableCellMatrix,
};

import NTableFilterString from "./js/table-filter/NTableFilterString.js";
import NTableFilterOption from "./js/table-filter/NTableFilterOption.js";

globalThis.NTableFilters = {
    'string': NTableFilterString,
    'option': NTableFilterOption,
};

import NTableMatrixPlugin from "./js/plugin/NTableMatrixPlugin.js";
import NTableSelectPlugin from "./js/plugin/NTableSelectPlugin.js";

globalThis.NTablePlugins = {
    'select': NTableSelectPlugin,
    'matrix': NTableMatrixPlugin,
};