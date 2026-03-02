import { PropType } from "vue";
import { Locale } from "@kizmann/pico-js";

export const UndefinedText = {

    /**
     * @type {PropType<string>}
     */
    undefinedText: {
        type: String, default: () => Locale.trans('Undefined')
    },

};

export const EmptyText = {

    /**
     * @type {PropType<string>}
     */
    emptyText: {
        type: String, default: () => Locale.trans('No items')
    },

};

export const TrueText = {

    /**
     * @type {PropType<string>}
     */
    trueText: {
        type: String, default: () => Locale.trans('Yes')
    },

};

export const FalseText = {

    /**
     * @type {PropType<string>}
     */
    falseText: {
        type: String, default: () => Locale.trans('No')
    },

};