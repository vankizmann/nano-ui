import Table from "./src/table/table.jsx";
import TableColumn from "./src/table-column/table-column.jsx";
import TableCellString from "./src/table-cell/types/table-cell-string.jsx";
import TableCellBoolean from "./src/table-cell/types/table-cell-boolean.jsx";
import TableCellDatetime from "./src/table-cell/types/table-cell-datetime.jsx";
import TableCellOption from "./src/table-cell/types/table-cell-option.jsx";
import TableCellImage from "./src/table-cell/types/table-cell-image.jsx";
import TableCellMatrix from "./src/table-cell/types/table-cell-matrix.jsx";
import TableCellSelect from "./src/table-cell/types/table-cell-select.jsx";
import TableFilterString from "./src/table-filter/types/table-filter-string.jsx";
import TableFilterBoolean from "./src/table-filter/types/table-filter-boolean.jsx";
import TableFilterDatetime from "./src/table-filter/types/table-filter-datetime.jsx";
import TableFilterOption from "./src/table-filter/types/table-filter-option.jsx";


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