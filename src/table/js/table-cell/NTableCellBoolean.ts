import { h } from "vue";
import { Str } from "@kizmann/pico-js";

export const NTableCellBoolean = ({ props, input, column }) => {

    const args = [
        column.data.trueText, column.data.falseText
    ];

    const value = Str.boolean(input, ...args);

    props = {
        ...props, innerHTML: `<span>${value}</span>`
    };

    return h('div', props);
};

export default NTableCellBoolean;