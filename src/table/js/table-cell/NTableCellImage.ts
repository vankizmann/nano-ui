import { h } from "vue";
import { Obj, Run, Str } from "@kizmann/pico-js";

export const NTableCellImage = ({ node, table, column, props, input, comp }) => {

    const data = column.get('data')

    props = {
        ...props,
    };

    const { total } = node.value;

    let image : any = {
        file: input,
        index: total,
        group: column.uid,
    };

    if ( data.thumbProp ) {
        image.thumb = Obj.get(node.item, data.thumbProp);
    }

    image.onFocus = () => {
        table.ncx('draglist').setTotalCurrent(total);
    };

    return h('div', props, [
        comp('n-preview', image)
    ]);
};

export default NTableCellImage;