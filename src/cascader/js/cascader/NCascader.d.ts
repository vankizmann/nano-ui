export const NCascaderProps: ({
    /**
     * @type {PropType<string>}
     */
    placeholder: PropType<string>;
    modelValue: PropType<any[] | object>;
    splitValue: PropType<any[] | object>;
    trigger: PropType<string>;
    options: PropType<any[] | object>;
    visible: PropType<any[] | object>;
    labelProp: PropType<string>;
    valueProp: PropType<string>;
    childProp: PropType<string>;
    disabledProp: PropType<string>;
    load: PropType<boolean>;
} | {
    /**
     * @type {PropType<string>}
     */
    placeholder: PropType<string>;
    modelValue: PropType<any[] | object>;
    splitValue: PropType<any[] | object>;
    trigger: PropType<string>;
    options: PropType<any[] | object>;
    visible: PropType<any[] | object>;
    labelProp: PropType<string>;
    valueProp: PropType<string>;
    childProp: PropType<string>;
    disabledProp: PropType<string>;
    disabled: PropType<boolean>;
} | {
    /**
     * @type {PropType<string>}
     */
    placeholder: PropType<string>;
    modelValue: PropType<any[] | object>;
    splitValue: PropType<any[] | object>;
    trigger: PropType<string>;
    options: PropType<any[] | object>;
    visible: PropType<any[] | object>;
    labelProp: PropType<string>;
    valueProp: PropType<string>;
    childProp: PropType<string>;
    disabledProp: PropType<string>;
    size: PropType<string>;
} | {
    /**
     * @type {PropType<string>}
     */
    placeholder: PropType<string>;
    modelValue: PropType<any[] | object>;
    splitValue: PropType<any[] | object>;
    trigger: PropType<string>;
    options: PropType<any[] | object>;
    visible: PropType<any[] | object>;
    labelProp: PropType<string>;
    valueProp: PropType<string>;
    childProp: PropType<string>;
    disabledProp: PropType<string>;
    type: PropType<string>;
}) & ({
    clearable: PropType<boolean>;
} | {
    clearValue: PropType<string | number | boolean>;
} | {
    undefinedText: PropType<string>;
} | {
    emptyText: PropType<string>;
} | {
    position: PropType<string>;
});
declare const _default: import("vue").DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, import("vue").PublicProps>;
export default _default;
import { PropType } from "vue";
