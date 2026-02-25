import { PropType } from "vue";
import { Arr } from "@kizmann/pico-js";

const POPOVER_POSITION = [
    'top-start',
    'top-center',
    'top-end',
    'bottom-start',
    'bottom-center',
    'bottom-end',
    'left-start',
    'left-center',
    'left-end',
    'right-start',
    'right-center',
    'right-end',
];

export const PositionBottomStart = {

    /**
     * @type {PropType<string>}
     */
    position: {
        type: String, default: 'bottom-start', validator: (v) => Arr.has(POPOVER_POSITION, v)
    },

};

export const PositionBottomCenter = {

    /**
     * @type {PropType<string>}
     */
    position: {
        type: String, default: 'bottom-center', validator: (v) => Arr.has(POPOVER_POSITION, v)
    },

};