export const NCheckboxProps: {
    /**
     * @type {PropType<number|boolean>}
     */
    modelValue: PropType<number | boolean>;
    /**
     * @type {PropType<number|boolean|string>}
     */
    value: PropType<number | boolean | string>;
    /**
     * @type {PropType<boolean>}
     */
    allowUncheck: PropType<boolean>;
    /**
     * @type {PropType<boolean>}
     */
    global: PropType<boolean>;
} & ({
    disabled: PropType<boolean>;
} | {
    size: PropType<string>;
} | {
    type: PropType<string>;
});
declare const _default: import("vue").DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, import("vue").PublicProps>;
export default _default;
import { PropType } from "vue";
