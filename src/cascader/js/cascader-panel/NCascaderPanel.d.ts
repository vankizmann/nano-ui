export const NCascaderPanelProps: {
    /**
     * @type {PropType<array|object>}
     */
    modelValue: PropType<any[] | object>;
    /**
     * @type {PropType<array|object>}
     */
    splitValue: PropType<any[] | object>;
    /**
     * @type {PropType<string>}
     */
    placeholder: PropType<string>;
    /**
     * @type {PropType<string>}
     */
    trigger: PropType<string>;
    /**
     * @type {PropType<array|object>}
     */
    options: PropType<any[] | object>;
    /**
     * @type {PropType<array|object>}
     */
    visible: PropType<any[] | object>;
    /**
     * @type {PropType<string>}
     */
    labelProp: PropType<string>;
    /**
     * @type {PropType<string>}
     */
    valueProp: PropType<string>;
    /**
     * @type {PropType<string>}
     */
    childProp: PropType<string>;
    /**
     * @type {PropType<string>}
     */
    disabledProp: PropType<string>;
} & ({
    load: PropType<boolean>;
} | {
    disabled: PropType<boolean>;
} | {
    size: PropType<string>;
} | {
    type: PropType<string>;
});
declare const _default: import("vue").DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, import("vue").PublicProps>;
export default _default;
import { PropType } from "vue";
