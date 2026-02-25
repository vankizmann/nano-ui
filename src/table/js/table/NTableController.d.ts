/**
 * @class NTableController
 * @extends {GroupController<NTableController, NTableProps, NTableView, NTableData>}
 */
export class NTableController extends GroupController<NTableController, {
    filter: import("vue").PropType<any[]>;
    sortProp: import("vue").PropType<string>;
    sortDir: import("vue").PropType<string>;
    visible: import("vue").PropType<any[]>;
} & ({
    load: import("vue").PropType<boolean>;
} | {
    size: import("vue").PropType<string>;
} | {
    type: import("vue").PropType<string>;
} | {
    items: import("vue").PropType<any[]>;
    current: import("vue").PropType<object>;
    selected: import("vue").PropType<any[]>;
    expanded: import("vue").PropType<any[]>;
    group: import("vue").PropType<any[]>;
    allowGroups: import("vue").PropType<any[]>;
    safezone: import("vue").PropType<number | Function>;
    renderHandle: import("vue").PropType<boolean>;
    renderExpand: import("vue").PropType<boolean>;
    renderSelect: import("vue").PropType<boolean>;
    allowSelect: import("vue").PropType<boolean | Function>;
    allowDrag: import("vue").PropType<boolean | Function>;
    allowDrop: import("vue").PropType<boolean | Function>;
    transformDrop: import("vue").PropType<Function>;
    insertNode: import("vue").PropType<boolean>;
    removeNode: import("vue").PropType<boolean>;
    uniqueProp: import("vue").PropType<string>;
    childProp: import("vue").PropType<string>;
    itemHeight: import("vue").PropType<number>;
    itemOffset: import("vue").PropType<number>;
    itemSkip: import("vue").PropType<boolean>;
    rootSkip: import("vue").PropType<boolean>;
}), NTableView> {
    constructor(props: any, context: any);
    setup(): this;
    onMounted(): void;
    buildVisible(): void;
    buildFilters(): {};
    buildFilter(column: any, merge?: boolean): {
        value: any;
        type: any;
        property: any;
    };
    getWidth(uid: any): any;
    getStyle(column: any): {
        flex: string;
    };
    toggleSelect(): any;
    getTotalSelect(): any;
    applyColumnFilter(): void;
    resetColumnFilter(column: any): void;
    applySortColumn(column: any): void;
}
export default NTableController;
import { NTableView } from "./NTableView.jsx";
import { GroupController } from "../../../root/index.js";
