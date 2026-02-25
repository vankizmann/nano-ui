export const NTableProps: {
    /**
     * @type {PropType<array>}
     */
    filter: PropType<any[]>;
    /**
     * @type {PropType<string>}
     */
    sortProp: PropType<string>;
    /**
     * @type {PropType<string>}
     */
    sortDir: PropType<string>;
    /**
     * @type {PropType<array>}
     */
    visible: PropType<any[]>;
} & ({
    load: PropType<boolean>;
} | {
    size: PropType<string>;
} | {
    type: PropType<string>;
} | {
    items: PropType<any[]>;
    current: PropType<object>;
    selected: PropType<any[]>;
    expanded: PropType<any[]>;
    group: PropType<any[]>;
    allowGroups: PropType<any[]>;
    safezone: PropType<number | Function>;
    renderHandle: PropType<boolean>;
    renderExpand: PropType<boolean>;
    renderSelect: PropType<boolean>;
    allowSelect: PropType<boolean | Function>;
    allowDrag: PropType<boolean | Function>;
    allowDrop: PropType<boolean | Function>;
    transformDrop: PropType<Function>;
    insertNode: PropType<boolean>;
    removeNode: PropType<boolean>;
    uniqueProp: PropType<string>;
    childProp: PropType<string>;
    itemHeight: PropType<number>;
    itemOffset: PropType<number>;
    itemSkip: PropType<boolean>;
    rootSkip: PropType<boolean>;
});
declare const _default: import("vue").DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, import("vue").PublicProps>;
export default _default;
import { PropType } from "vue";
