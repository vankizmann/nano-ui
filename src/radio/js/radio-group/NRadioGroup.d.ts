export const NRadioGroupProps: {
    /**
     * @type {PropType<string|number>}
     */
    modelValue: PropType<string | number>;
} & ({
    disabled: PropType<boolean>;
} | {
    size: PropType<string>;
} | {
    type: PropType<string>;
} | {
    align: PropType<string>;
});
declare const _default: import("vue").DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, import("vue").PublicProps>;
export default _default;
import { PropType } from "vue";
