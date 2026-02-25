export const NTableColumnProps: {
    /**
     * @type {PropType<any>}
     */
    uid: PropType<any>;
    /**
     * @type {PropType<any>}
     */
    modelValue: PropType<any>;
    /**
     * @type {PropType<object>}
     */
    data: PropType<object>;
    /**
     * @type {PropType<object>}
     */
    plugin: PropType<object>;
    /**
     * @type {PropType<string>}
     */
    type: PropType<string>;
    /**
     * @type {PropType<string>}
     */
    label: PropType<string>;
    /**
     * @type {PropType<string>}
     */
    prop: PropType<string>;
    /**
     * @type {PropType<boolean>}
     */
    sort: PropType<boolean>;
    /**
     * @type {PropType<string>}
     */
    sortProp: PropType<string>;
    /**
     * @type {PropType<boolean>}
     */
    filter: PropType<boolean>;
    /**
     * @type {PropType<string>}
     */
    filterProp: PropType<string>;
    /**
     * @type {PropType<boolean|function>}
     */
    disabled: PropType<boolean | Function>;
    /**
     * @type {PropType<boolean>}
     */
    visible: PropType<boolean>;
    /**
     * @type {PropType<string|number>}
     */
    breakpoint: PropType<string | number>;
    /**
     * @type {PropType<string>}
     */
    align: PropType<string>;
    /**
     * @type {PropType<string|number>}
     */
    width: PropType<string | number>;
    /**
     * @type {PropType<number>}
     */
    fixedWidth: PropType<number>;
    /**
     * @type {PropType<number>}
     */
    minWidth: PropType<number>;
    /**
     * @type {PropType<number>}
     */
    maxWidth: PropType<number>;
    /**
     * @type {PropType<string>}
     */
    datetimeFormat: PropType<string>;
} & ({
    options: import("vue").PropType<object>;
    optionsValue: import("vue").PropType<string>;
    optionsLabel: import("vue").PropType<string>;
} | {
    undefinedText: import("vue").PropType<string>;
} | {
    emptyText: import("vue").PropType<string>;
} | {
    trueText: import("vue").PropType<string>;
} | {
    falseText: import("vue").PropType<string>;
});
declare const _default: import("vue").DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, import("vue").PublicProps>;
export default _default;
import { PropType } from "vue";
