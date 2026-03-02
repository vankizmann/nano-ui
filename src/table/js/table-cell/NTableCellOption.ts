import { h } from "vue";

export const NTableCellOption = ({ props, input, column }) => {

    let value = column.getOption(input)

    if ( value === input ) {
        value = column.data.undefinedText;
    }

    props = {
        ...props, innerHTML: `<span>${value}</span>`
    };

    return h('div', props);
};

export default NTableCellOption;