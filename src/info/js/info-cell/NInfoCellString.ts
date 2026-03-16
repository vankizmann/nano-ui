import { h } from "vue";
import { Str } from "@kizmann/pico-js";

export const NInfoString = ({ props, input }) => {

    const value = Str.string(input);

    props = {
        ...props, innerHTML: `<span>${value}</span>`
    };

    return h('div', props);
};

export default NInfoString;