export const NPopoverProps: {
    /**
     * @type {PropType<boolean>}
     */
    modelValue: PropType<boolean>;
    /**
     * @type {PropType<number>}
     */
    width: PropType<number>;
    /**
     * @type {PropType<string|null>}
     */
    target: PropType<string | null>;
    /**
     * @type {PropType<string>}
     */
    trigger: PropType<string>;
    /**
     * @type {PropType<boolean>}
     */
    toggle: PropType<boolean>;
} & ({
    load: PropType<boolean>;
} | {
    size: PropType<string>;
} | {
    type: PropType<string>;
} | {
    theme: PropType<string>;
} | {
    position: PropType<string>;
});
declare const _default: import("vue").DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, import("vue").PublicProps>;
export default _default;
import { PropType } from "vue";
