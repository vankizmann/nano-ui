import { h } from "vue";
import { Arr, Str } from "@kizmann/pico-js";

export const NTableCellMatrix = ({ props, bem, column, node }) => {

    props.class = [
        ...props.class, `${bem}--checkbox`
    ];

    if ( column.plugin.equal(node.item) ) {
        Arr.append(props.class, 'n-checked');
    }

    if ( column.plugin.disabled(node.item) ) {
        Arr.append(props.class, 'n-disabled');
    }

    if ( column.plugin.uncheck(node.item) ) {
        Arr.remove(props.class, 'n-disabled');
    }

    props = {
        ...props, innerHTML: `<i class="fa fa-check"></i>`
    };

    props.onClick = () => {
        column.plugin.toggle(node.item);
    };

    return h('div', props);
};

export default NTableCellMatrix;