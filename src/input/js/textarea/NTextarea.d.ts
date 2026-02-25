export const NTextareaProps: {
    /**
     * @type {PropType<string|number>}
     */
    modelValue: PropType<string | number>;
    /**
     * @type {PropType<string>}
     */
    placeholder: PropType<string>;
    /**
     * @type {PropType<boolean>}
     */
    autoRows: PropType<boolean>;
    /**
     * @type {PropType<number>}
     */
    minRows: PropType<number>;
    /**
     * @type {PropType<number>}
     */
    maxRows: PropType<number>;
    /**
     * @type {PropType<number>}
     */
    maxLength: PropType<number>;
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
