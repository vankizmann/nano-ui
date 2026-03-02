import { PropType } from "vue";
import { Arr } from "@kizmann/pico-js";
import { AlignDirection, AlignPosition } from "../data/AlignData.ts";

const ALIGN_DIRECTION : AlignDirection[] = [
    'horizontal', 'vertical'
];

const AlignDirectionValidator = (v : string) => {
    return Arr.has(ALIGN_DIRECTION, v);
};

const ALIGN_POSITION : AlignPosition[] = [
    'left', 'center', 'right'
];

const AlignPositionValidator = (v : string) => {
    return Arr.has(ALIGN_POSITION, v);
};

export const AlignHorizontal = {

    /**
     * @type {PropType<string>}
     */
    align: {
        type: [String], default: 'horizontal', validator: AlignDirectionValidator
    },

};

export const AlignVertical = {

    /**
     * @type {PropType<string>}
     */
    align: {
        type: [String], default: 'vertical', validator: AlignDirectionValidator
    },

};

export const AlignLeft = {

    /**
     * @type {PropType<string>}
     */
    align: {
        type: [String], default: 'left', validator: AlignPositionValidator
    },

};

export const AlignRight = {

    /**
     * @type {PropType<string>}
     */
    align: {
        type: [String], default: 'left', validator: AlignPositionValidator
    },

};
