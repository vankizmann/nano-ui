export const NPopoverOptionProps: {
    /**
     * @type {PropType<boolean>}
     */
    focus: PropType<boolean>;
    /**
     * @type {PropType<boolean>}
     */
    active: PropType<boolean>;
    /**
     * @type {PropType<boolean>}
     */
    clickClose: PropType<boolean>;
} & ({
    disabled: PropType<boolean>;
} | {
    icon: PropType<string>;
} | {
    iconPosition: PropType<string>;
});
declare const _default: import("vue").DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, import("vue").PublicProps>;
export default _default;
import { PropType } from "vue";
