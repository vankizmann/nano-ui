import Table from './src/table/table';

import TableColumn from './src/table-column/table-column';

import TableCellString from './src/table-cell/types/table-cell-string';

import TableCellBoolean from './src/table-cell/types/table-cell-boolean';

import TableCellDatetime from './src/table-cell/types/table-cell-datetime';

import TableCellOption from './src/table-cell/types/table-cell-option';

import TableCellImage from './src/table-cell/types/table-cell-image';

import TableCellMatrix from './src/table-cell/types/table-cell-matrix';

import TableFilterString from './src/table-filter/types/table-filter-string';

import TableFilterBoolean from './src/table-filter/types/table-filter-boolean';

import TableFilterDatetime from './src/table-filter/types/table-filter-datetime';

import TableFilterOption from './src/table-filter/types/table-filter-option';


export default function (App) {
    App.component(Table.name, Table);
    App.component(TableColumn.name, TableColumn);
    App.component(TableCellString.name, TableCellString);
    App.component(TableCellBoolean.name, TableCellBoolean);
    App.component(TableCellDatetime.name, TableCellDatetime);
    App.component(TableCellOption.name, TableCellOption);
    App.component(TableCellImage.name, TableCellImage);
    App.component(TableCellMatrix.name, TableCellMatrix);
    App.component(TableFilterString.name, TableFilterString);
    App.component(TableFilterBoolean.name, TableFilterBoolean);
    App.component(TableFilterDatetime.name, TableFilterDatetime);
    App.component(TableFilterOption.name, TableFilterOption);
}