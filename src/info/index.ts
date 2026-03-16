import { App } from "vue";
import NInfo from "./js/info/NInfo.ts";
import NInfoColumn from "./js/info-column/NInfoColumn.ts";
import NTableCellString from "../table/js/table-cell/NTableCellString.ts";
import NTableCellBoolean from "../table/js/table-cell/NTableCellBoolean.ts";
import NTableCellDatetime from "../table/js/table-cell/NTableCellDatetime.ts";
import NTableCellImage from "../table/js/table-cell/NTableCellImage.ts";
import NTableCellOption from "../table/js/table-cell/NTableCellOption.ts";

export default function (App : App) {
    App.component(NInfo.name, NInfo);
    App.component(NInfoColumn.name, NInfoColumn);
}

globalThis.NInfoCells = {
    'string': NTableCellString,
    'boolean': NTableCellBoolean,
    'datetime': NTableCellDatetime,
    'image': NTableCellImage,
    'option': NTableCellOption,
};