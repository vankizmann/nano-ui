import { h } from "vue";
import { Obj, Run, Str } from "@kizmann/pico-js";

export const NTableCellImage = ({ node, table, column, props, input, comp }) => {

    const data = column.get('data')

    props = {
        ...props,
    };

    let image : any = {
        file: input,
        group: column.uid,
    };

    if ( Obj.has(node, 'value.total') ) {
        image.index = node.value.total;
    }

    if ( Obj.has(data, 'thumbProp') ) {
        image.thumb = Obj.get(node.item, data.thumbProp);
    }

    image.onFocus = () => {
        table?.ncx('draglist').setTotalCurrent(image.index);
    };

    return h('div', props, [
        comp('n-preview', image)
    ]);
};

export default NTableCellImage;