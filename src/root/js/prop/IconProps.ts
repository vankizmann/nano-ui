import { PropType } from "vue";
import { Arr } from "@kizmann/pico-js";
import { IconPosition } from "../data/IconData.ts";

const ICON_POSITION: IconPosition[] = [
    'before', 'after'
];

export const Icon = {

    /**
     * @type {PropType<string>}
     */
    icon: {
        type: String, default: ''
    },

};

export const IconDisabled = {

    /**
     * @type {PropType<string>}
     */
    iconDisabled: {
        type: Boolean, default: false,
    },

};

export const IconPositionBefore = {

    /**
     * @type {PropType<string>}
     */
    iconPosition: {
        type: String, default: 'before', validator: (v) => Arr.has(ICON_POSITION, v)
    },

};

export const IconPositionAfter = {

    /**
     * @type {PropType<string>}
     */
    iconPosition: {
        type: String, default: 'after', validator: (v) => Arr.has(ICON_POSITION, v)
    },

};
