import { PropType } from "vue";
import { Arr } from "@kizmann/pico-js";

const ALIGN_DIRECTION = [
    'horizontal', 'vertical'
];

const ALIGN_POSITION = [
    'left', 'center', 'right'
];

export const AlignHorizontal = {

    /**
     * @type {PropType<string>}
     */
    align: {
        type: String, default: 'horizontal', validator: (v) => Arr.has(ALIGN_DIRECTION, v)
    },

};

export const AlignVertical = {

    /**
     * @type {PropType<string>}
     */
    align: {
        type: String, default: 'vertical', validator: (v) => Arr.has(ALIGN_DIRECTION, v)
    },

};

export const AlignLeft = {

    /**
     * @type {PropType<string>}
     */
    align: {
        type: String, default: 'left', validator: (v) => Arr.has(ALIGN_POSITION, v)
    },

};

export const AlignRight = {

    /**
     * @type {PropType<string>}
     */
    align: {
        type: String, default: 'left', validator: (v) => Arr.has(ALIGN_POSITION, v)
    },

};
