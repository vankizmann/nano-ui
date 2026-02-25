export const NSwitchProps: {
    /**
     * @type {PropType<number|boolean|string|object>}
     */
    modelValue: PropType<number | boolean | string | object>;
    /**
     * @type {PropType<string>}
     */
    onType: PropType<string>;
    /**
     * @type {PropType<string>}
     */
    offType: PropType<string>;
    /**
     * @type {PropType<number|boolean|string|object>}
     */
    onValue: PropType<number | boolean | string | object>;
    /**
     * @type {PropType<number|boolean|string|object>}
     */
    offValue: PropType<number | boolean | string | object>;
    /**
     * @type {PropType<boolean>}
     */
    inline: PropType<boolean>;
} & ({
    disabled: PropType<boolean>;
} | {
    size: PropType<string>;
});
declare const _default: import("vue").DefineSetupFnComponent<Record<string, any>, {}, {}, Record<string, any> & {}, import("vue").PublicProps>;
export default _default;
import { PropType } from "vue";
