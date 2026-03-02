import Table from "./src/table/table.ts";
import TableColumn from "./src/table-column/table-column.ts";
import TableCellString from "./src/table-cell/types/table-cell-string.ts";
import TableCellBoolean from "./src/table-cell/types/table-cell-boolean.ts";
import TableCellDatetime from "./src/table-cell/types/table-cell-datetime.ts";
import TableCellOption from "./src/table-cell/types/table-cell-option.ts";
import TableCellImage from "./src/table-cell/types/table-cell-image.ts";
import TableCellMatrix from "./src/table-cell/types/table-cell-matrix.ts";
import TableCellSelect from "./src/table-cell/types/table-cell-select.ts";
import TableFilterString from "./src/table-filter/types/table-filter-string.ts";
import TableFilterBoolean from "./src/table-filter/types/table-filter-boolean.ts";
import TableFilterDatetime from "./src/table-filter/types/table-filter-datetime.ts";
import TableFilterOption from "./src/table-filter/types/table-filter-option.ts";


export default function (App) {
    App.component(Table.name, Table);
    App.component(TableColumn.name, TableColumn);
    App.component(TableCellString.name, TableCellString);
    App.component(TableCellBoolean.name, TableCellBoolean);
    App.component(TableCellDatetime.name, TableCellDatetime);
    App.component(TableCellOption.name, TableCellOption);
    App.component(TableCellImage.name, TableCellImage);
    App.component(TableCellMatrix.name, TableCellMatrix);
    App.component(TableCellSelect.name, TableCellSelect);
    App.component(TableFilterString.name, TableFilterString);
    App.component(TableFilterBoolean.name, TableFilterBoolean);
    App.component(TableFilterDatetime.name, TableFilterDatetime);
    App.component(TableFilterOption.name, TableFilterOption);
}