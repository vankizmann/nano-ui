export const NResizerProps: {
    /**
     * @type {PropType<number>}
     */
    modelValue: PropType<number>;
    /**
     * @type {PropType<number>}
     */
    width: PropType<number>;
    /**
     * @type {PropType<number>}
     */
    minWidth: PropType<number>;
    /**
     * @type {PropType<number>}
     */
    maxWidth: PropType<number>;
    /**
     * @type {PropType<array>}
     */
    group: PropType<any[]>;
    /**
     * @type {PropType<string>}
     */
    flex: PropType<string>;
    /**
     * @type {PropType<string>}
     */
    direction: PropType<string>;
} & ({
    disabled: PropType<boolean>;
} | {
    type: PropType<string>;
});
declare const _default: import("vue").DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, import("vue").PublicProps>;
export default _default;
import { PropType } from "vue";
