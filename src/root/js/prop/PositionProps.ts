import { PropType } from "vue";
import { Arr } from "@kizmann/pico-js";
import { PopoverPosition, DrawerPosition } from "../data/PositionData.ts";

const POPOVER_POSITION: PopoverPosition[] = [
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

const PopoverPositionValidator = (v : string) => {
    return Arr.has(POPOVER_POSITION, v);
};

const DRAWER_POSITION: DrawerPosition[] = [
    'top',
    'bottom',
    'left',
    'right',
];

const DrawerPositionValidator = (v : string) => {
    return Arr.has(DRAWER_POSITION, v);
};

export const PositionBottomStart = {

    /**
     * @type {PropType<string>}
     */
    position: {
        type: String, default: 'bottom-start', validator: PopoverPositionValidator
    },

};

export const PositionBottomCenter = {

    /**
     * @type {PropType<string>}
     */
    position: {
        type: String, default: 'bottom-center', validator: PopoverPositionValidator
    },

};

export const PositionDrawer = {

    /**
     * @type {PropType<string>}
     */
    position: {
        type: String, default: 'right', validator: DrawerPositionValidator
    },

}

export const PositionModal = {

    /**
     * @type {PropType<string>}
     */
    position: {
        type: String, default: 'right', validator: DrawerPositionValidator
    },

}