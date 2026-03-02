import NTable from "./js/table/NTable.ts";
import NTableColumn from "./js/table-column/NTableColumn.ts";

export default function (App) {
    App.component(NTable.name, NTable);
    App.component(NTableColumn.name, NTableColumn);
}

import NTableCellString from "./js/table-cell/NTableCellString.ts";
import NTableCellBoolean from "./js/table-cell/NTableCellBoolean.ts";
import NTableCellDatetime from "./js/table-cell/NTableCellDatetime.ts";
import NTableCellOption from "./js/table-cell/NTableCellOption.ts";
import NTableCellSelect from "./js/table-cell/NTableCellSelect.ts";
import NTableCellMatrix from "./js/table-cell/NTableCellMatrix.ts";

globalThis.NTableCells = {
    'string': NTableCellString,
    'boolean': NTableCellBoolean,
    'datetime': NTableCellDatetime,
    'option': NTableCellOption,
    'select': NTableCellSelect,
    'matrix': NTableCellMatrix,
};

import NTableFilterString from "./js/table-filter/NTableFilterString.ts";
import NTableFilterOption from "./js/table-filter/NTableFilterOption.ts";

globalThis.NTableFilters = {
    'string': NTableFilterString,
    'option': NTableFilterOption,
};

import NTableMatrixPlugin from "./js/plugin/NTableMatrixPlugin.ts";
import NTableSelectPlugin from "./js/plugin/NTableSelectPlugin.ts";

globalThis.NTablePlugins = {
    'select': NTableSelectPlugin,
    'matrix': NTableMatrixPlugin,
};