export const NInputNumberProps: {
    /**
     * @type {PropType<string|number>}
     */
    modelValue: PropType<string | number>;
    /**
     * @type {PropType<number>}
     */
    min: PropType<number>;
    /**
     * @type {PropType<number>}
     */
    max: PropType<number>;
    /**
     * @type {PropType<number>}
     */
    stepSize: PropType<number>;
    /**
     * @type {PropType<number>}
     */
    precision: PropType<number>;
    /**
     * @type {PropType<string>}
     */
    format: PropType<string>;
    /**
     * @type {PropType<string>}
     */
    placeholder: PropType<string>;
} & ({
    load: PropType<boolean>;
} | {
    disabled: PropType<boolean>;
} | {
    size: PropType<string>;
} | {
    type: PropType<string>;
} | {
    clearable: PropType<boolean>;
} | {
    clearValue: PropType<string | number | boolean>;
} | {
    icon: PropType<string>;
} | {
    iconDisabled: PropType<string>;
} | {
    iconPosition: PropType<string>;
});
declare const _default: import("vue").DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, import("vue").PublicProps>;
export default _default;
import { PropType } from "vue";
