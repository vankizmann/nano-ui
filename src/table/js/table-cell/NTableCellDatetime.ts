import { h } from "vue";
import { Now } from "@kizmann/pico-js";

export const NTableCellDatetime = ({ props, input, column }) => {

    const { data } = column.unpack()

    const value = Now.make(input).format(...[
        data.datetimeFormat
    ]);

    props = {
        ...props, innerHTML: `<span>${value}</span>`
    };

    return h('div', props);
};

export default NTableCellDatetime;