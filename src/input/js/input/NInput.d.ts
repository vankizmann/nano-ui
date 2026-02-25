export const NInputProps: {
    /**
     * @type {PropType<string|number>}
     */
    modelValue: PropType<string | number>;
    /**
     * @type {PropType<string>}
     */
    nativeType: PropType<string>;
    /**
     * @type {PropType<string>}
     */
    placeholder: PropType<string>;
    /**
     * @type {PropType<function>}
     */
    onButtonClick: PropType<Function>;
    /**
     * @type {PropType<function>}
     */
    onButtonDblclick: PropType<Function>;
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
